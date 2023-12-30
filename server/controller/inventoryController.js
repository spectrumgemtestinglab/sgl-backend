import Inventory from '../model/inventoryModel.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const inventoryController = {
  getAllInventoryItems: async (req, res) => {
    try {
      const inventory = await Inventory.find();
      res.status(200).json(inventory);
    } catch (error) {
      console.error('Error fetching Inventory:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createInventoryItem: [
    upload.single('image'),
    async (req, res) => {
      try {
        const {
          type,
          subtype,
          name,
          weight,
          shape,
          price,
          colour,
          value
        } = req.body;

        const imageBase64 = req.file.buffer.toString('base64');

        const newInventoryItem = new Inventory({
          type,
          subtype,
          name,
          weight,
          shape,
          price,
          colour,
          value,
          image: imageBase64
        });

        const savedItem = await newInventoryItem.save();
        res.status(201).json(savedItem);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  ],

  deleteInventoryItem: async (req, res) => {
    try {
      const itemId = req.params.id;

      // Check if the item exists
      const itemToDelete = await Inventory.findById(itemId);
      if (!itemToDelete) {
        return res.status(404).json({ message: 'Item not found' });
      }

      
      await Inventory.findByIdAndDelete(itemId);
      
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting Inventory item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export default inventoryController;
