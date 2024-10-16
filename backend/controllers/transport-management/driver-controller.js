import { Driver } from '../../models/transport-management/driver-model.js';

async function index(req, res) {
    try {
        // Get all drivers
        const drivers = await Driver.find({});
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

async function show(req, res) {
    try {
        // Find driver by driver_id
        const driver = await Driver.findOne({ driver_id: req.params.id });
        if (!driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }
        res.json(driver);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

async function create(req, res) {
    try {
        const { driver_id, vehicle_id } = req.body;
        console.log(req.body);

        // Check if driver already exists
        let driver = await Driver.findOne({ driver_id });
        console.log(driver);

        if (driver) {
            // If driver exists, update the vehicle_id
            driver.vehicle_id = vehicle_id;
            await driver.save();
            return res.json({ message: 'Driver updated successfully', driver });
        } else {
            // If driver does not exist, create a new driver
            driver = new Driver(req.body);
            console.log(driver);
            await driver.save();
            return res.status(201).json({ message: 'Driver created successfully', driver });
        }
    } catch (error) {
        console.error("Error saving the driver:", error);  // <-- Add more detailed logging here
        res.status(400).json({ error: error.message });
    }
}


async function update(req, res) {
    try {
        const driver = await Driver.findOne({ driver_id: req.params.id });

        if (!driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }

        Object.assign(driver, req.body);
        await driver.save();
        res.json(driver);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function destroy(req, res) {
    try {
        const driver = await Driver.findOne({ driver_id: req.params.id });
        if (!driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }
        await driver.deleteOne();
        res.json({ message: 'Driver deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

export { index, show, create, update, destroy };
