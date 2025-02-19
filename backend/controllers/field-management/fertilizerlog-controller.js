import { FertilizerLog } from "../../models/field-management/fertilizerlog-model.js";
import { Fertilizer } from "../../models/field-management/fertilizer-model.js";
import { Field } from "../../models/field-management/field-model.js";

async function showFertilizerLogs(req, res) {
  try {
    const { scheduleId } = req.params;

    let logs;

    if (scheduleId) {
      logs = await FertilizerLog.find({ scheduleId });

      if (!logs || logs.length === 0) {
        return res
          .status(404)
          .json({ message: "No logs found for this fertilizer schedule" });
      }
    } else {
      logs = await FertilizerLog.find();
    }

    res
      .status(200)
      .json({ message: "Fertilizer logs retrieved successfully", logs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving fertilizer logs", error });
  }
}

async function indexFertilizerLogs(req, res) {
  try {
    const logs = await FertilizerLog.find();

    if (!logs || logs.length === 0) {
      return res.status(404).json({ message: "No fertilizer logs found" });
    }

    res
      .status(200)
      .json({ message: "Fertilizer logs retrieved successfully", logs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving fertilizer logs", error });
  }
}

async function createFertilizerLog(req, res) {
  try {
    const { scheduleId, fertilizerType, amount } = req.body;

    const schedule = await Fertilizer.findById(scheduleId);

    if (!schedule) {
      return res.status(404).json({ message: "Fertilizer schedule not found" });
    }

    const field = await Field.findOne({ name: schedule.fieldName });
    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    const totalAmountApplied = amount * field.area;

    const newLog = new FertilizerLog({
      scheduleId,
      dateApplied: new Date(),
      fertilizerType,
      amount: totalAmountApplied,
      fieldApplied: schedule.fieldName,
    });

    await newLog.save();

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
    case "Once in 2 weeks":
      return new Date(now.setDate(now.getDate() + 14));
    default:
      return null; // For "When advised" or any other custom frequency
  }
}

export { showFertilizerLogs, indexFertilizerLogs, createFertilizerLog };