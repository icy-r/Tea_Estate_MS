import { Asset } from "../../models/repair-management/asset-model.js";

// index for getting all assets
export const index = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// performance for getting the performance of the asset
export const performance = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    const performance = await Asset.findById(req.params.id);
    res.status(200).json(performance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// show for getting a single asset
export const show = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create for creating a new asset
export const create = async (req, res) => {
  try {
    const asset = new Asset(req.body);
    await asset.save();
    res.status(201).json(asset);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// update for updating a asset
export const update = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// destroy for deleting a asset
export const destroy = async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Asset deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//searchfield for searching a asset
export const search = async (req, res) => {
  try {
    //search for asset by assetNumber matching the search field
    const assets = await Asset.find({
      assetNumber: { $regex: req.params.id, $options: "i" },
    });
    console.log(assets);
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getAssetByTransportId for getting a asset by transport id
export const getAssetByTransportId = async (req, res) => {
  try {
    //assetNumber=chassisNo
    const asset = await Asset.find({ assetNumber: req.params.id });
    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
