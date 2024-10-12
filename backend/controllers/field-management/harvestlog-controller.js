import { HarvestLog } from "../../models/field-management/harvestlog-model.js";
import { Field } from "../../models/field-management/field-model.js";
import { Labour } from "../../models/field-management/labour-model.js";
import { Fertilizer } from "../../models/field-management/fertilizer-model.js";
import sendWhatsAppMessage from "../../services/twilio.js";

// Store a new harvest log
async function create(req, res) {
  try {
    const harvestLog = new HarvestLog(req.body);
    await harvestLog.save();

    // Iterate through all fields in the log to calculate and update each one
    for (const log of harvestLog.logs) {
      const total = log.totalBest + log.totalGood + log.totalDamaged;
      const damagedPercentage = (log.totalDamaged / total) * 100;

      // Find the field by field_name
      const field = await Field.findOne({ name: log.fieldName });

      if (field) {
        if (damagedPercentage > 30) {
          field.fieldStatus = "In Progress";

          // Update fertilizer schedule for poor-quality harvests
          await updateFertilizerSchedule(log.fieldName, damagedPercentage);

          // Find the supervisor of the field
          const supervisor = await Labour.findOne({
            assignedField: field.name,
            role: "Supervisor",
          });

          if (supervisor && supervisor.phoneNumber) {
            const message = `Alert: The field "${
              field.name
            }" has ${damagedPercentage.toFixed(
              2
            )}% damaged crops and has been marked as "In Progress". The fertilizer schedule has been automatically updated.`;

            try {
              await sendWhatsAppMessage(supervisor.phoneNumber, message);
              console.log(
                `Notification sent to supervisor (${supervisor.phoneNumber}) for field ${field.name}`
              );
            } catch (notificationError) {
              console.error(
                "Error sending WhatsApp notification:",
                notificationError
              );
            }
          } else {
            console.log(`No supervisor found for field ${field.name}`);
          }
        } else {
          // Reset fertilizer schedule if quality is back to normal
          await resetFertilizerSchedule(log.fieldName);
        }

        await field.save();
      }
    }

    res.json(harvestLog);
  } catch (error) {
    console.error("Error in create harvest log:", error);
    res.status(400).json({ error: error.message });
  }
}

// Function to update the fertilizer schedule
async function updateFertilizerSchedule(fieldName, poorQualityPercentage) {
  try {
    const fertilizerSchedule = await Fertilizer.findOne({ fieldName });
    if (fertilizerSchedule) {
      // Update application rates by the percentage of poor quality
      const updatedFertilizers = fertilizerSchedule.fertilizers.map(
        (fertilizer) => ({
          type: fertilizer.type,
          applicationRate:
            Math.round(
              (fertilizer.defaultApplicationRate ||
                fertilizer.applicationRate) *
                (1 + poorQualityPercentage / 100) *
                100
            ) / 100,
          defaultApplicationRate:
            fertilizer.defaultApplicationRate || fertilizer.applicationRate,
        })
      );

      // Update the frequency based on the poor quality percentage
      let updatedFrequency = fertilizerSchedule.frequency;
      if (poorQualityPercentage > 30 && poorQualityPercentage <= 50) {
        updatedFrequency = "Twice a week";
      } else if (poorQualityPercentage > 50) {
        updatedFrequency = "Thrice a week";
      }

      // Save updated schedule
      const updatedSchedule = await Fertilizer.findOneAndUpdate(
        { fieldName: fieldName },
        {
          $set: {
            fertilizers: updatedFertilizers,
            frequency: updatedFrequency,
          },
        },
        { new: true, runValidators: true }
      );

      if (updatedSchedule) {
        console.log(
          `Fertilizer schedule updated for field ${fieldName}:`,
          updatedSchedule
        );
      } else {
        console.log(`No fertilizer schedule found for field ${fieldName}`);
      }
    } else {
      console.log(`No fertilizer schedule found for field ${fieldName}`);
    }
  } catch (error) {
    console.error("Error updating fertilizer schedule:", error);
    console.error(JSON.stringify(error, null, 2));
  }
}

// Function to reset the fertilizer schedule if quality returns to normal
async function resetFertilizerSchedule(fieldName) {
  try {
    const fertilizerSchedule = await Fertilizer.findOne({ fieldName });
    if (fertilizerSchedule) {
      // Reset application rates to the default
      const resetFertilizers = fertilizerSchedule.fertilizers.map(
        (fertilizer) => ({
          type: fertilizer.type,
          applicationRate:
            fertilizer.defaultApplicationRate || fertilizer.applicationRate,
          defaultApplicationRate:
            fertilizer.defaultApplicationRate || fertilizer.applicationRate,
        })
      );

      // Reset the frequency to normal and update the schedule
      const updatedSchedule = await Fertilizer.findOneAndUpdate(
        { fieldName: fieldName },
        {
          $set: {
            fertilizers: resetFertilizers,
            frequency: "Once a week",
          },
        },
        { new: true, runValidators: true }
      );

      if (updatedSchedule) {
        console.log(
          `Fertilizer schedule reset for field ${fieldName}:`,
          updatedSchedule
        );
      } else {
        console.log(`No fertilizer schedule found for field ${fieldName}`);
      }

      // Set the field status back to active
      await Field.findOneAndUpdate(
        { name: fieldName },
        { fieldStatus: "Active" }
      );
    } else {
      console.log(`No fertilizer schedule found for field ${fieldName}`);
    }
  } catch (error) {
    console.error("Error resetting fertilizer schedule:", error);
    console.error(JSON.stringify(error, null, 2));
  }
}

// Get all harvest logs
async function index(req, res) {
  try {
    const logs = await HarvestLog.find({});
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching harvest logs" });
  }
}

// Get a specific harvest log by ID
async function show(req, res) {
  try {
    const log = await HarvestLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ error: "Harvest log not found" });
    }
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: "Error fetching harvest log" });
  }
}

export { create, index, show };
