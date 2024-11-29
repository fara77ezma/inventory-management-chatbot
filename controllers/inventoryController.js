const Inventory = require("../models/inventory");

const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find({ deleted: false });

    if (inventory.length === 0) {
      return res.status(200).json({
        response: "The inventory is empty. No items found.",
      });
    }

    const items = inventory
      .map(
        (item) =>
          `\nitem: ${item.item}: Quantity: ${item.quantity}, Price: $${item.price}\n`
      )
      .join("\n");

    return res.status(200).json({
      response: `Here are the available items:\n${items}`,
    });
  } catch (error) {
    return res.status(400).json({
      response: `I encountered an error while retrieving the inventory: ${error.message}`,
    });
  }
};

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      item: req.body.item,
      deleted: false,
    });

    if (!inventory) {
      return res.status(404).json({
        response: `I couldn't find any item called '${req.body.item}' in the inventory.`,
      });
    }

    return res.status(200).json({
      response: `Details for '${inventory.item}': Quantity: ${inventory.quantity}, Price: $${inventory.price}.`,
    });
  } catch (error) {
    return res.status(400).json({
      response: `I encountered an error while retrieving the item '${req.body.item}': ${error.message}`,
    });
  }
};

const createInventory = async (req, res) => {
  try {
    const inv = await Inventory.findOne({
      item: req.body.item,
      deleted: false,
    });
    if (inv) {
      return res.status(400).json({
        response: `The item '${req.body.item}' already exists in the inventory.`,
      });
    }
    const { item, quantity, price } = req.body;

    if (!item || !price) {
      return res.status(400).json({
        response:
          "I need both the item name and price to add it to the inventory.",
      });
    }

    const inventory = await Inventory.create({
      item,
      quantity,
      price,
    });

    return res.status(201).json({
      response: `The item '${item}' has been added to the inventory with a quantity of ${quantity} and a price of $${price}.`,
    });
  } catch (error) {
    return res.status(400).json({
      response: `I couldn't add the item '${req.body.item}': ${error.message}`,
    });
  }
};

const updateInventory = async (req, res) => {
  try {
    const { item, quantity, price } = req.body;
    const existingInventory = await Inventory.findOne({ item, deleted: false });

    if (!existingInventory) {
      return res.status(404).json({
        response: `I couldn't find an item called '${item}' in the inventory to update.`,
      });
    }

    const updates = {
      quantity: quantity || existingInventory.quantity,
      price: price || existingInventory.price,
    };

    const updatedInventory = await Inventory.findOneAndUpdate(
      { item, deleted: false },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      response: `The item '${item}' has been updated to Quantity: ${updatedInventory.quantity}, Price: $${updatedInventory.price}.`,
    });
  } catch (error) {
    return res.status(400).json({
      response: `I encountered an error while updating the item '${req.body.item}': ${error.message}`,
    });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const { item } = req.body;
    const deletedInventory = await Inventory.updateMany(
      { item },
      { deleted: true }
    );

    if (!deletedInventory) {
      return res.status(404).json({
        response: `I couldn't find an item called '${item}' to delete.`,
      });
    }

    return res.status(200).json({
      response: `The item '${item}' has been deleted from the inventory.`,
    });
  } catch (error) {
    res.status(400).json({
      response: `I encountered an error while deleting the item '${req.body.item}': ${error.message}`,
    });
  }
};

module.exports = {
  getAllInventory,
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
};
