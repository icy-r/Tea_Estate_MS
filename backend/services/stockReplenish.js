// services/stockReplenishment.js
import { Inventory } from '../models/inventory-management/inventory-model.js';
import { sendRequisition } from './notifications.js'; // Import notification function

async function checkReorderPoints() {
  try {
    // Fetch all inventory items
    const items = await Inventory.find({});

    // Loop through each item to check its quantity against reorder points
    items.forEach(item => {
      // Check if the item's quantity is below or equal to its reorder point
      if (item.quantity <= item.minLevel) {
        // Determine the notification type based on the item type
        let recipient;
        switch (item.type.toLowerCase()) {
          case 'tea':
            recipient = 'harvest manager'; // Specify the role for tea
            break;
          case 'fuel':
          case 'fertilizer':
          case 'utilities':
            recipient = 'supply manager'; // Specify the role for other categories
            break;
          default:
            recipient = 'general manager'; // Default recipient if type is unknown
        }
        // Send a notification based on the item type and recipient
        sendRequisition(item, recipient);
      }
    });
  } catch (error) {
    console.error('Error checking reorder points:', error);
  }
}

export { checkReorderPoints };