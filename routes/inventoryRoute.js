const express = require("express");

const router = express.Router();

const inventoryController = require("../controllers/inventoryController");
const chatController = require("../controllers/chatController");
router.post("/", chatController.userChat);

router.get("/", inventoryController.getAllInventory);
router.get("/:id", inventoryController.getInventory);
router.post("/", inventoryController.createInventory);
router.put("/:id", inventoryController.updateInventory);
router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;
