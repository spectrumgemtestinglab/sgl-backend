
import multer from "multer";
import mongoose from "mongoose";
import Gems from "../model/gemsModel.js";

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
    upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]),
    async (req, res) => {
      try {
        const { name, weight, colour, subtype, units, shape, dimensions, description } = req.body;
  
        if (!req.files?.['image1'] || !req.files?.['image2']) {
          return res.status(400).json({ error: 'Both image files are required' });
        }
  
        if (!name || !weight || !colour || !subtype || !units || !shape || !dimensions || !description) {
          return res.status(400).json({ error: 'All gem fields are required' });
        }
  
        const image1 = req.files['image1'][0].buffer.toString('base64');
        const image2 = req.files['image2'][0].buffer.toString('base64');
  
        const gems = new Gems({ name, weight, colour, subtype, units, shape, dimensions, description, image1, image2 });
        const savedGems = await gems.save();
  
        res.status(201).json(savedGems);
      } catch (error) {
        console.error('Error creating gem:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  ],
  

  deleteGem: async (req, res) => {
    try {
      const gemId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(gemId)) {
        return res.status(400).json({ error: 'Invalid Gem ID' });
      }

      const deletedGem = await Gems.findByIdAndDelete(gemId);

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
