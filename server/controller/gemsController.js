import Gems from "../model/gemsModel.js";
import multer from "multer";
import mongoose from "mongoose"; // Add this import

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const gemsController = {
  getAllGems: async (req, res) => {
    try {
      const gems = await Gems.find();
      res.status(200).json(gems);
    } catch (error) {
      console.error('Error fetching gems:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createGem: [
    upload.single('image'),
    async (req, res) => {
      try {
        const { name, price, weight, colour, subtype, units, value, shape } = req.body;
  
        if (!req.file) {
          return res.status(400).json({ error: 'Image file is required' });
        }
  
        const image = req.file.buffer.toString('base64');
  
        if (!name || !price || !weight || !colour) {
          return res.status(400).json({ error: 'Gems name, price, weight, and colour are required' });
        }
  
        const gems = new Gems({ name, price, image, weight, colour, subtype, units, value, shape });
        const savedGems = await gems.save();
  
        res.status(201).json(savedGems);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  ],
  
  deleteGem: async (req, res) => {
    try {
      const gemId = req.params.id;
  
      // Check if the provided ID is valid
      if (!mongoose.Types.ObjectId.isValid(gemId)) {
        return res.status(400).json({ error: 'Invalid Gem ID' });
      }
  
      console.log('Received Gem ID:', gemId);
  
      const deletedGem = await Gems.findByIdAndDelete(gemId);
      console.log('Deleted Gem:', deletedGem); // Add this line for debugging
  
      if (!deletedGem) {
        return res.status(404).json({ error: 'Gem not found' });
      }
  
      res.status(200).json({ message: 'Gem deleted successfully', deletedGem });
    } catch (error) {
      console.error('Error deleting gem:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default gemsController;
