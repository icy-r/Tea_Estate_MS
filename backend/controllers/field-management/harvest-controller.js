import { Harvest } from "../../models/field-management/harvest-model.js";
import { Field } from "../../models/field-management/field-model.js";
import { Labour } from "../../models/field-management/labour-model.js";
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

    const total = harvest.best_qnty + harvest.good_qnty + harvest.damaged_qnty;
    const damagedPercentage = (harvest.damaged_qnty / total) * 100;

    const field = await Field.findOne({ name: harvest.field_name });

    if (field) {
      if (damagedPercentage > 30) {
        field.fieldStatus = "Needs Maintenance";

        const supervisor = await Labour.findOne({
          assignedField: field.name,
          role: "Supervisor",
        });

        if (supervisor && supervisor.phoneNumber) {
          const message = `Alert: The field "${
            field.name
          }" has ${damagedPercentage.toFixed(
            2
          )}% damaged crops and has been marked as "Needs Maintenance". Please take necessary actions.`;

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
        field.fieldStatus = "Active";
      }

      await field.save();
    }

    res.json(harvest);
  } catch (error) {
    console.error("Error in create harvest:", error);
    res.status(400).json({ error: error.message });
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