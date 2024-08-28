import {Catalog } from '../../models/product-management/catalog-model.js';
//import catalogModel from '../models/catalog-model.js';


async function index(req, res) {
    try {
        const catalogs = await Catalog.find({});
        res.json(catalogs);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

async function addPhoto(req, res) {
    try {
        const imageFile = req.files.productImage.path;
        const catalog = await Catalog.findById(req.params.id);
        catalog.productImage = imageFile;
        await catalog.save();
        res.status(201).json(catalog.productImage);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
async function show(req, res) { 
    try {
        const catalog = await Catalog.find({id: req.params.id});
        res.json(catalog);
    } catch (error) {
        res.status(404).json({ error: error });
    }
}

async function create(req, res) {
    try {
        const catalog = new Catalog(req.body);
        await catalog.save();
        res.json(catalog);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function update(req, res) {
    try {
        const catalog = await Catalog.findOne({id: req.params.id});
        Object.assign(catalog, req.body);
        await catalog.save();
        res.json(catalog);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

async function destroy(req, res) {
    try {
        const catalog = await Catalog.findOne({ id: req.params.id });
        if (!catalog) {
            return res.status(404).json({ error: 'Catalog not found' });
        }
        await catalog.deleteOne();
        res.json({ message: 'Catalog deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

export { index, addPhoto, show, create, update, destroy };