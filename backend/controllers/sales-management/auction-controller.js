import { Auction } from '../../models/sales-management/auction-model.js';

async function index(req, res) {
  try {
    const auction = await Auction.find({});
    res.json(auction);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    const auction = await Auction.find({ id: req.params.id });
    res.json(auction);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const meetingLink = 'https://your-meeting-platform.com/auction-room-id'; // Replace with dynamic link generation logic
    const auction = new Auction({
      ...req.body,
      meetingLink,  // Save the meeting link in the auction data
      buyer_id: Array.isArray(req.body.buyer_id) ? req.body.buyer_id : [req.body.buyer_id],  // Ensure buyer_id is an array
      productID: req.body.productID  // Include productID
    });
    await auction.save();
    res.json(auction);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {
    const auction = await Auction.findByIdAndUpdate(req.params.id);
    Object.assign(auction, req.body);
    await auction.save();
    res.json(auction);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function destroy(req, res) {
  try {
    const auction = await Auction.findByIdAndDelete(req.params.id);
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found' });
    }
    await auction.deleteOne();
    res.json({ message: 'Auction deleted' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export { index, show, create, update, destroy };
