import { TransportLog } from '../../models/transport-management/transport-log-model.js';
import { Transport } from '../../models/transport-management/Transport-model.js'; // Assuming Transport model is in models/Transport

// Function to schedule transports and log them

async function create(req, res) {

  try {
    // 1. Fetch all transports
    const transports = await Transport.find({});

    // 2. Define the times for different dailyOccurrence values
    const timeSlots = {
      1: ['17:00'], // Only evening log (5 PM)
      2: ['08:00', '17:00'], // Morning (8 AM) and evening (5 PM)
      3: ['08:00', '12:00', '17:00'] // Morning (8 AM), noon (12 PM), and evening (5 PM)
    };

    // 3. Loop through each transport and create logs based on dailyOccurrence
    for (const transport of transports) {
      const { dailyOccurrence, vehicle_id, route_id, type } = transport;

      // Check if dailyOccurrence exists and is valid
      if (dailyOccurrence && timeSlots[dailyOccurrence]) {
        // Loop through the times and create logs
        for (const time of timeSlots[dailyOccurrence]) {
          const transportLog = new TransportLog({
            type,
            vehicle_id,
            route_id,
            date: new Date(), // Log the current date
            time, // Log the specific time (morning, noon, evening)
            status: 'upcoming', // Default status as 'upcoming'
          });

          // Save the log to the database
          await transportLog.save();
        }
      }
    }

    // Send success response
    res.status(200).json({ message: 'Transport logs scheduled successfully.' });

  } catch (error) {
    console.error('Error scheduling transport logs:', error);
    res.status(500).json({ error: 'Failed to schedule transport logs' });
  }
};

async function index(req, res) {
  try {
    //get all transports
    const transports = await TransportLog.find({});
    res.json(transports);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_transport = req.params.id
    const transport = await TransportLog.find({id: req.params.id});
    res.json(transport);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}


async function update(req, res) {
  try {

    const transport = await TransportLog.findOne({id: req.params.id});

    Object.assign(transport, req.body);
    await transport.save();
    res.json(transport);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function destroy(req, res) {
  try {
    const transport = await TransportLog.findOne({ id: req.params.id });
    if (!transport) {
      return res.status(404).json({ error: 'Transport not found' });
    }
    await transport.deleteOne();
    res.json({ message: 'Transport deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });

  }
}

export { index, show, create, update, destroy };