import { Fertilizer } from "../../models/field-management/fertilizer-model.js";
import { FertilizerLog } from "../../models/field-management/fertilizerlog-model.js";
import { Field } from "../../models/field-management/field-model.js";

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

    const currentDate = new Date();
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
      lastFertilizationDate: currentDate,
      nextFertilizationDate: calculateNextFertilizationDate(
        currentDate,
        frequency
      ),
      totalPerFertilizer: fertilizers.map((f) => ({
        type: f.type,
        totalApplied: 0,
      })),
    });

    await fertilizer.save();

    for (const fert of fertilizers) {
      const quantity = fert.applicationRate * field.area;
      await createFertilizerLog(
        fertilizer._id,
        currentDate,
        fert.type,
        quantity,
        fieldName
      );

      const fertilizerTypeIndex = fertilizer.totalPerFertilizer.findIndex(
        (t) => t.type === fert.type
      );
      if (fertilizerTypeIndex !== -1) {
        fertilizer.totalPerFertilizer[fertilizerTypeIndex].totalApplied +=
          quantity;
      }
    }

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
    const { scheduleId } = req.params;
    const fertilizer = await Fertilizer.findById(scheduleId);
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
        scheduleId,
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

    res.json({ message: "Fertilizer applied successfully", fertilizer });
  } catch (error) {
    console.error("Error applying fertilizer:", error);
    res.status(500).json({ message: error.message });
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