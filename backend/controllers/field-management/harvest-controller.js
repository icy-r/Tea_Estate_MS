import { Harvest } from "../../models/field-management/harvest-model.js";
import { Field } from "../../models/field-management/field-model.js";
import { Labour } from "../../models/field-management/labour-model.js";
import { Fertilizer } from "../../models/field-management/fertilizer-model.js";
import { sendWhatsAppMessage } from "../../services/twilio.js";

async function index(req, res) {
  try {
    //get all harvests
    const harvests = await Harvest.find({});
    res.json(harvests);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_harvest = req.params.id
    const harvest = await Harvest.find({ id: req.params.id });
    res.json(harvest);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const harvest = new Harvest(req.body);
    await harvest.save();

    // Calculate damaged percentage
    const total = harvest.best_qnty + harvest.good_qnty + harvest.damaged_qnty;
    const damagedPercentage = (harvest.damaged_qnty / total) * 100;

    // Find the field by field_name
    const field = await Field.findOne({ name: harvest.field_name });

    if (field) {
      if (damagedPercentage > 30) {
        field.fieldStatus = "Needs Maintenance";

        // Update fertilizer schedule for poor-quality harvests
        await updateFertilizerSchedule(harvest.field_name, damagedPercentage);

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
          )}% damaged crops and has been marked as "Needs Maintenance". The fertilizer schedule has been automatically updated. Please take necessary actions.`;

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
        await resetFertilizerSchedule(harvest.field_name);
      }

      await field.save();
    }

    res.json(harvest);
  } catch (error) {
    console.error("Error in create harvest:", error);
    res.status(400).json({ error: error.message });
  }
}

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
    // Log the full error object for debugging
    console.error(JSON.stringify(error, null, 2));
  }
}

async function resetFertilizerSchedule(fieldName) {
  try {
    const fertilizerSchedule = await Fertilizer.findOne({ fieldName });
    if (fertilizerSchedule) {
      // Reset application rates to the default, ensuring defaultApplicationRate exists
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
            frequency: "Once a week", // Reset frequency
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
    // Log the full error object for debugging
    console.error(JSON.stringify(error, null, 2));
  }
}


async function update(req, res) {
    try {

        const harvest = await Harvest.findOne({ id: req.params.id });

        Object.assign(harvest, req.body);
        await harvest.save();
        res.json(harvest);
        } catch (error) {
        res.status(400).json({ error: error });
        }
}

async function destroy(req, res) {
    try {
        const harvest = await Harvest.findOne({ id: req.params.id });
        if (!harvest) {
        return res.status(404).json({ error: 'Harvest not found' });
        }
        await harvest.deleteOne();
        res.json({ message: 'Harvest deleted' });
        } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
        }
}

export { index, show, create, update, destroy }