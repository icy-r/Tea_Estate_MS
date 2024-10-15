import { TransportLog } from '../../models/transport-management/transport-log-model.js';
import { Transport } from "../../models/transport-management/transport-model.js"; 
import { Notification } from "../../models/repair-management/notification-model.js";

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

    const notification = new Notification({
      title: "Today's Transport Logs Scheduled",
      description: `Navigate to the Transport Logs section to view today's transport logs.`,
    });
    await notification.save();



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
    const transportId=req.params.id;
    const transport = await TransportLog.findById(transportId);
    res.json(transport);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}


async function update(req, res) {
  try {
    // Find the transport log by MongoDB _id
    const transport = await TransportLog.findById(req.params.id);
    
    // If the transport log doesn't exist, return a 404 error
    if (!transport) {
      return res.status(404).json({ error: 'Transport not found' });
    }

    // Update the transport log with the data from the request body
    Object.assign(transport, req.body);
    
    // Save the updated transport log
    await transport.save();
    
    // Send back the updated transport log
    res.json(transport);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}


async function destroy(req, res) {
  try {
    const transport = await TransportLog.findById(req.params.id); // Find by MongoDB _id
    if (!transport) {
      return res.status(404).json({ error: 'Transport not found' });
    }
    await transport.deleteOne(); // Delete the transport log
    res.json({ message: 'Transport deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
}

export { index, show, create, update, destroy };