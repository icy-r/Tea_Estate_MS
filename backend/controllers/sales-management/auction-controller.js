import { Auction } from '../../models/sales-management/auction-model.js';
import { Buyer } from '../../models/product-management/buyer-model.js';  // Import Buyer model
import { Catalog } from '../../models/product-management/catalog-model.js';  // Import Catalog model

// Fetch all auctions with populated buyer and product details
async function index(req, res) {
  try {
    const auctions = await Auction.find({})
      .populate({
        path: 'buyer_id',
        select: 'name', // Adjust based on what fields you need from Buyer
      })
      .populate({
        path: 'productID',
        select: 'pid', // Adjust based on what fields you need from Product
      });
      
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Fetch a single auction by id with populated buyer and product details
async function show(req, res) {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate({
        path: 'buyer_id',
        select: 'name', // Adjust based on what fields you need from Buyer
      })
      .populate({
        path: 'productID',
        select: 'pid', // Adjust based on what fields you need from Product
      });
      
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }
    res.json(auction);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// Create a new auction with buyer and product references
async function create(req, res) {
  try {
    const { buyer_id, productID } = req.body;

    // Validate if the buyer IDs exist in the Buyer model
    const buyers = await Buyer.find({ _id: { $in: buyer_id } });
    if (buyers.length !== buyer_id.length) {
      return res.status(400).json({ error: "Some buyers not found" });
    }

    // Validate if the productID exists in the Catalog model
    const product = await Catalog.findById(productID);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    const meetingLink = 'https://your-meeting-platform.com/auction-room-id';  // Replace with dynamic link generation logic

    const auction = new Auction({
      ...req.body,
      meetingLink,  // Save the meeting link in the auction data
      buyer_id,  // Add validated buyer IDs
      productID,  // Add validated productID
    });

    await auction.save();
    res.json(auction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update an auction
async function update(req, res) {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }

    const { buyer_id, productID } = req.body;

    // Validate if the buyer IDs exist in the Buyer model
    const buyers = await Buyer.find({ _id: { $in: buyer_id } });
    if (buyers.length !== buyer_id.length) {
      return res.status(400).json({ error: "Some buyers not found" });
    }

    // Validate if the productID exists in the Catalog model
    const product = await Catalog.findById(productID);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    Object.assign(auction, {
      ...req.body,
      buyer_id,  // Update with validated buyer IDs
      productID,  // Update with validated productID
    });

    await auction.save();
    res.json(auction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete an auction
async function destroy(req, res) {
  try {
    const auction = await Auction.findByIdAndDelete(req.params.id);
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }
    res.json({ message: 'Auction deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { index, show, create, update, destroy };
