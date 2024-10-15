import { Fertilizer } from "../../models/field-management/fertilizer-model.js";
import { FertilizerLog } from "../../models/field-management/fertilizerlog-model.js";
import { Field } from "../../models/field-management/field-model.js";
import { Labour } from "../../models/field-management/labour-model.js";
import sendWhatsAppMessage from "../../services/twilio.js";

async function index(req, res) {
  try {
    const fertilizers = await Fertilizer.find({});
    res.json(fertilizers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function show(req, res) {
  try {
    const fertilizer = await Fertilizer.findOne({ id: req.params.id });
    if (!fertilizer) {
      return res.status(404).json({ message: "Fertilizer schedule not found" });
    }
    res.json(fertilizer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const {
      id,
      fieldName,
      scheduleName,
      fertilizers,
      frequency,
      weatherAdjustment,
    } = req.body;

    if (!id || !fieldName || !scheduleName || !fertilizers || !frequency) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!Array.isArray(fertilizers) || fertilizers.length === 0) {
      return res
        .status(400)
        .json({ message: "Fertilizers must be a non-empty array" });
    }

    const field = await Field.findOne({ name: fieldName });
    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    const fertilizer = new Fertilizer({
      id,
      fieldName,
      scheduleName,
      fertilizers: fertilizers.map((f) => ({
        ...f,
        defaultApplicationRate: f.applicationRate,
      })),
      frequency,
      weatherAdjustment: weatherAdjustment || false,
      lastFertilizationDate: "NA",
      nextFertilizationDate: "NA",
      totalPerFertilizer: fertilizers.map((f) => ({
        type: f.type,
        totalApplied: 0,
      })),
    });

    await fertilizer.save();

    field.fertilizerSchedule = scheduleName;
    await field.save();

    res.status(201).json(fertilizer);
  } catch (error) {
    console.error("Error in create fertilizer:", error);
    res.status(400).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const fertilizer = await Fertilizer.findOne({ id: req.params.id });
    if (!fertilizer) {
      return res.status(404).json({ message: "Fertilizer schedule not found" });
    }

    Object.assign(fertilizer, req.body);
    await fertilizer.save();
    res.json(fertilizer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function destroy(req, res) {
  try {
    const fertilizer = await Fertilizer.findOne({ id: req.params.id });
    if (!fertilizer) {
      return res.status(404).json({ message: "Fertilizer schedule not found" });
    }
    await fertilizer.deleteOne();
    res.json({ message: "Fertilizer schedule deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function applyFertilizer(req, res) {
  try {
    const { id } = req.params;
    const fertilizer = await Fertilizer.findOne({ id });
    if (!fertilizer) {
      return res.status(404).json({ message: "Fertilizer schedule not found" });
    }

    const field = await Field.findOne({ name: fertilizer.fieldName });
    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    const currentDate = new Date();
    for (const fert of fertilizer.fertilizers) {
      const quantity = fert.applicationRate * field.area;
      await createFertilizerLog(
        fertilizer._id,
        currentDate,
        fert.type,
        quantity,
        fertilizer.fieldName
      );

      const fertilizerTypeIndex = fertilizer.totalPerFertilizer.findIndex(
        (t) => t.type === fert.type
      );
      if (fertilizerTypeIndex !== -1) {
        fertilizer.totalPerFertilizer[fertilizerTypeIndex].totalApplied +=
          quantity;
      }
    }

    fertilizer.lastFertilizationDate = currentDate;
    fertilizer.nextFertilizationDate = calculateNextFertilizationDate(
      currentDate,
      fertilizer.frequency
    );
    await fertilizer.save();

    // Assign maintainer and send notifications
    await assignMaintainerToField(field.name);

    res.json({ message: "Fertilizer applied successfully", fertilizer });
  } catch (error) {
    console.error("Error applying fertilizer:", error);
    res.status(500).json({ message: error.message });
  }
}

async function assignMaintainerToField(fieldName) {
  try {
    // Find an available Maintainer
    const availableMaintainer = await Labour.findOne({
      role: "Maintainer",
      assignedField: "none",
    });

    if (!availableMaintainer) {
      console.log("No available Maintainer found");
      return;
    }

    // Assign the Maintainer to the field
    availableMaintainer.assignedField = fieldName;
    await availableMaintainer.save();

    console.log(
      `Maintainer ${availableMaintainer.firstName} ${availableMaintainer.lastName} assigned to ${fieldName}`
    );

    // Schedule the unassignment for the next day
    setTimeout(
      () => unassignMaintainer(availableMaintainer._id),
      24 * 60 * 60 * 1000
    );

    // Find the supervisor for the field
    const supervisor = await Labour.findOne({
      assignedField: fieldName,
      role: "Supervisor",
    });

    if (supervisor && supervisor.phoneNumber) {
      const message = `Maintainer ${availableMaintainer.firstName} ${availableMaintainer.lastName} has been assigned to ${fieldName} for fertilizer application.`;

      try {
        await sendWhatsAppMessage(supervisor.phoneNumber, message);
        console.log(
          `WhatsApp notification sent to supervisor (${supervisor.phoneNumber}) for field ${fieldName}`
        );
      } catch (whatsappError) {
        console.error("Error sending WhatsApp notification:", whatsappError);
      }
    } else {
      console.log(`No supervisor found for field ${fieldName}`);
    }
  } catch (error) {
    console.error("Error assigning Maintainer:", error);
  }
}

async function unassignMaintainer(maintainerId) {
  try {
    const maintainer = await Labour.findById(maintainerId);
    if (maintainer) {
      maintainer.assignedField = "none";
      await maintainer.save();
      console.log(
        `Maintainer ${maintainer.firstName} ${maintainer.lastName} unassigned`
      );
    }
  } catch (error) {
    console.error("Error unassigning Maintainer:", error);
  }
}

async function createFertilizerLog(
  scheduleId,
  dateApplied,
  fertilizerType,
  amount,
  fieldApplied
) {
  const newLog = new FertilizerLog({
    scheduleId,
    dateApplied,
    fertilizerType,
    amount,
    fieldApplied,
  });
  await newLog.save();
}

function calculateNextFertilizationDate(currentDate, frequency) {
  const nextDate = new Date(currentDate);
  switch (frequency) {
    case "Once a week":
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case "Twice a week":
      nextDate.setDate(nextDate.getDate() + 3);
      break;
    case "Once in 2 weeks":
      nextDate.setDate(nextDate.getDate() + 14);
      break;
    default:
      return null; // For "When advised" or any other custom frequency
  }
  return nextDate;
}

export { index, show, create, update, destroy, applyFertilizer };