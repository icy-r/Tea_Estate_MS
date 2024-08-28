import { Auction } from '../../models/sales-management/auction-model.js';

async function index(req, res) {
  try {
    //get all auction
    const auction = await Auction.find({});
    res.json(auction);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function show(req, res) {
  try {
    //id_auction = req.params.id
    const auction = await Auction.find({id: req.params.id});
    res.json(auction);
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

async function create(req, res) {
  try {
    const auction = new Auction(req.body);
    await auction.save();
    res.json(auction);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function update(req, res) {
  try {

    const auction = await Auction.findByIdAndUpdate( req.params.id);

    Object.assign(auction, req.body);
    await auction.save();
    res.json(auction);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

async function destroy(req, res) {
  try {
    const auction = await Auction.findByIdAndDelete( req.params.id );
    if (!auction) {
      return res.status(404).json({ error: 'auction not found' });
    }
    await auction.deleteOne();
    res.json({ message: 'auction deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });

  }
}

export { index, show, create, update, destroy };