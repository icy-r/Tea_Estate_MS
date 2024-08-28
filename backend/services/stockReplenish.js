// services/stockReplenishment.js
import { Inventory } from '../models/inventory.js';
import { sendRequisition } from './notifications.js'; // Import notification function

async function checkReorderPoints() {
  const items = await Inventory.find({});
  items.forEach(item => {
    if (item.quantity <= item.reorderPoint) {
      sendRequisition(item); // send notification
    }
  });
}

export { checkReorderPoints };
