import { FertilizerLog } from "../../models/field-management/fertilizerlog-model.js";
import { Fertilizer } from "../../models/field-management/fertilizer-model.js";

// Controller to create a fertilizer log
export async function createFertilizerLog(req, res) {
  try {
    const { scheduleId, fertilizerType, amount, recordedBy } = req.body;

    // Find the schedule by its ID
    const schedule = await Fertilizer.findById(scheduleId);

    if (!schedule) {
      return res.status(404).json({ message: "Fertilizer schedule not found" });
    }

    // Find the field's area and calculate total amount applied
    const fieldArea = schedule.fieldId.area;
    const totalAmountApplied = amount * fieldArea;

    // Create a new fertilizer log entry
    const newLog = new FertilizerLog({
      scheduleId,
      dateApplied: new Date(),
      fertilizerType,
      amount: totalAmountApplied,
    });

    // Save the log entry
    await newLog.save();

    // Update the fertilizer schedule's total applied amounts
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

    // Calculate the next and last fertilization dates
    schedule.lastFertilizationDate = new Date();
    schedule.nextFertilizationDate = calculateNextFertilizationDate(
      schedule.frequency
    );

    // Save the updated schedule
    await schedule.save();

    res.status(201).json({ message: "Fertilizer log created", log: newLog });
  } catch (error) {
    res.status(500).json({ message: "Error creating fertilizer log", error });
  }
}

// Function to calculate the next fertilization date based on frequency
function calculateNextFertilizationDate(frequency) {
  const now = new Date();
  switch (frequency) {
    case "Once a week":
      return new Date(now.setDate(now.getDate() + 7));
    case "Twice a week":
      return new Date(now.setDate(now.getDate() + 3));
    default:
      return new Date(now.setDate(now.getDate() + 14)); // Default to every two weeks
  }
}
