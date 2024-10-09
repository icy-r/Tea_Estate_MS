import cron from 'node-cron';
import mongoose from 'mongoose';
import { Transport } from '../models/transport-management/transport-model.js'; // Adjust the import based on your file structure
import { TransportLog } from '../models/transport-management/transport-log-model.js'; // Adjust the import based on your file structure

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true });
import '../config/database.js'


// Schedule the job to run daily at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Running daily transport scheduling task...');

    try {
        // Fetch all transports
        const transports = await Transport.find({ dailyOccurrence: { $gte: 1 } }); // Change criteria as necessary

        const today = new Date();
        const todayDate = today.toISOString().split('T')[0]; // Get today’s date in YYYY-MM-DD format

        for (const transport of transports) {
            for (let i = 0; i < transport.dailyOccurrence; i++) {
                // Create a new transport log entry
                const newTransportLog = new TransportLog({
                    id: transport.id, // Use the existing transport ID or generate a new one
                    type: transport.type,
                    vehicle_id: transport.vehicle_id,
                    route_id: transport.route_id,
                    date: todayDate,
                    time: `08:00`, // Default time; adjust as necessary
                    status: 'upcoming', // Default status
                });

                await newTransportLog.save();
                console.log(`Scheduled transport: ${newTransportLog}`);
            }
        }
        console.log('Daily transport scheduling task completed.');
    } catch (error) {
        console.error('Error scheduling transports:', error);
    }
});

// Export the cron job if needed
export default cron;
