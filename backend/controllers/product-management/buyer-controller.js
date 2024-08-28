import {Buyer} from "../../models/product-management/buyer-model.js";

async function index(req, res) {
    try {
        //get all buyers
        const buyers = await Buyer.find({});
        res.json(buyers);
    } catch (error) {
        res.status(500).json({ error: error });
    }

}

async function show(req, res) {
    try {
        //id_buyer = req.params.id
        const buyer = await Buyer.find({id: req.params.id});
        res.json(buyer);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

async function create(req, res) {
    try {
        const buyer = new Buyer(req.body);
        await buyer.save();
        res.json(buyer);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function update(req, res) {
    try {

        const buyer = await Buyer.findOne({id: req.params.id});

        Object.assign(buyer, req.body);
        await buyer.save();
        res.json(buyer);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function destroy(req, res) {
    try {
        const buyer = await Buyer.findOne({ id: req.params.id });
        if (!buyer) {
            return res.status(404).json({ error: 'Buyer not found' });
        }
        await buyer.deleteOne();
        res.json({ message: 'Buyer deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });

    }
}
export { index, show, create, update, destroy }; 