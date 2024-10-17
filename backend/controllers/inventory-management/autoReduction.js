import { Fert } from '../../models/inventory-management/inventory-fert-model.js';
import { Fuel } from '../../models/inventory-management/inventory-fuel-model.js';
import * as notificationController from '../../controllers/repair-management/notification-controller.js'; 

// Function to reduce stock by daily distribution amount
async function reduceFertilizerStock() {
    try {
        const fertilizers = await Fert.find({});

        for (const fertilizer of fertilizers) {
            const newQuantity = fertilizer.quantityInStock - fertilizer.dailyDistributionAmount;

            // Ensure the new quantity doesn't go below zero
            if (newQuantity >= 0) {
                await Fert.findOneAndUpdate(
                    { fertilizerId: fertilizer.fertilizerId },
                    { quantityInStock: newQuantity }
                );
                
                // Check if new quantity is below minimum level
                if (newQuantity < fertilizer.minimumLevel) {
                    // Create a notification for low stock
                    await notificationController.createNotification({
                        title: 'Low Fertilizer Stock',
                        description: `${fertilizer.fertilizerName} is below the minimum level.`,
                    });
                    console.warn(`Notification: ${fertilizer.fertilizerName} is below minimum level.`);
                }
            } else {
                console.warn(`Insufficient stock for ${fertilizer.fertilizerName}. Stock set to 0.`);
                await Fert.findOneAndUpdate(
                    { fertilizerId: fertilizer.fertilizerId },
                    { quantityInStock: 0 }
                );
                
                // Create a notification for stock set to zero
                await notificationController.createNotification({
                    title: 'Fertilizer Stock Empty',
                    description: `${fertilizer.fertilizerName} stock has been set to zero.`,
                });
                console.warn(`Notification: ${fertilizer.fertilizerName} is below minimum level.`);
            }
        }
        console.log("Fertilizer stock updated successfully.");
    } catch (error) {
        console.error("Error reducing fertilizer stock:", error);
    }
}

// Export the function
export { reduceFertilizerStock };

// Function to reduce stock by daily distribution amount
async function reduceFuelStock() {
    try {
        const fuels = await Fuel.find({});

        for (const fuel of fuels) {
            const newQuantity = fuel.quantityInStock - fuel.dailyDistributionAmount;

            // Ensure the new quantity doesn't go below zero
            if (newQuantity >= 0) {
                await Fuel.findOneAndUpdate(
                    { fuelId: fuel.fuelId },
                    { quantityInStock: newQuantity }
                );

                // Check if new quantity is below minimum level
                if (newQuantity < fuel.minimumLevel) {
                    // Create a notification for low stock
                    await notificationController.createNotification({
                        title: 'Low Fuel Stock',
                        description: `${fuel.fuelType} is below the minimum level.`,
                    });
                    console.warn(`Notification: ${fuel.fuelType} is below minimum level.`);
                }
            } else {
                console.warn(`Insufficient stock for ${fuel.fuelType}. Stock set to 0.`);
                await Fuel.findOneAndUpdate(
                    { fuelId: fuel.fuelId },
                    { quantityInStock: 0 }
                );

                // Create a notification for stock set to zero
                await notificationController.createNotification({
                    title: 'Fuel Stock Empty',
                    description: `${fuel.fuelType} stock has been set to zero.`,
                });
                console.warn(`Notification: ${fuel.fuelType} stock has been set to zero.`);
            }
        }
        console.log("Fuel stock updated successfully.");
    } catch (error) {
        console.error("Error reducing fuel stock:", error);
    }
}

// Export the function
export { reduceFuelStock };

