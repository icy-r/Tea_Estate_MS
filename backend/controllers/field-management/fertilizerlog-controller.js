import { FertilizerLog } from "../../models/field-management/fertilizerlog-model.js";
import { Fertilizer } from "../../models/field-management/fertilizer-model.js";

// Controller to show fertilizer logs
 async function showFertilizerLogs(req, res) {
  try {
    const { scheduleId } = req.params; // Fetch the schedule ID from the request params

    let logs;

    // If a specific schedule ID is provided, find logs for that schedule
    if (scheduleId) {
      logs = await FertilizerLog.find({ scheduleId });

      if (!logs || logs.length === 0) {
        return res.status(404).json({ message: "No logs found for this fertilizer schedule" });
      }
    } else {
      // If no schedule ID is provided, fetch all logs
      logs = await FertilizerLog.find();
    }

    // Respond with the found logs
    res.status(200).json({ message: "Fertilizer logs retrieved successfully", logs });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving fertilizer logs", error });
  }
}

// Controller to list all fertilizer logs
async function indexFertilizerLogs(req, res) {
  try {
    const logs = await FertilizerLog.find();

    if (!logs || logs.length === 0) {
      return res.status(404).json({ message: "No fertilizer logs found" });
    }

    // Respond with the found logs
    res.status(200).json({ message: "Fertilizer logs retrieved successfully", logs });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving fertilizer logs", error });
  }
}


// Existing createFertilizerLog method
async function createFertilizerLog(req, res) {
  try {
    const { scheduleId, fertilizerType, amount, recordedBy } = req.body;

    const schedule = await Fertilizer.findById(scheduleId);

    if (!schedule) {
      return res.status(404).json({ message: "Fertilizer schedule not found" });
    }

    const fieldArea = schedule.fieldId.area;
    const totalAmountApplied = amount * fieldArea;

    const newLog = new FertilizerLog({
      scheduleId,
      dateApplied: new Date(),
      fertilizerType,
      amount: totalAmountApplied,
    });

    await newLog.save();

    schedule.totalAmountApplied += totalAmountApplied;

    const fertilizerEntry = schedule.totalPerFertilizer.find(
      (f) => f.type === fertilizerType
    );

    if (fertilizerEntry) {
      fertilizerEntry.totalApplied += totalAmountApplied;
    } else {
      schedule.totalPerFertilizer.push({
        type: fertilizerType,
        totalApplied: totalAmountApplied,
      });
    }

    schedule.lastFertilizationDate = new Date();
    schedule.nextFertilizationDate = calculateNextFertilizationDate(
      schedule.frequency
    );

    await schedule.save();

    res.status(201).json({ message: "Fertilizer log created", log: newLog });
  } catch (error) {
    res.status(500).json({ message: "Error creating fertilizer log", error });
  }
}

function calculateNextFertilizationDate(frequency) {
  const now = new Date();
  switch (frequency) {
    case "Once a week":
      return new Date(now.setDate(now.getDate() + 7));
    case "Twice a week":
      return new Date(now.setDate(now.getDate() + 3));
    default:
      return new Date(now.setDate(now.getDate() + 14));
  }
}

export { showFertilizerLogs, indexFertilizerLogs, createFertilizerLog };