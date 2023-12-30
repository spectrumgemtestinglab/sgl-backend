
import Diamonds from '../model/diamondsModel.js';

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const diamondsController = {
  getAllDiamonds: async (req, res) => {
    try {
      const diamonds = await Diamonds.find();
      res.status(200).json(diamonds);
    } catch (error) {
      console.error('Error fetching diamonds:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createDiamond: [
    upload.single('image'),
    async (req, res) => {
      try {
        const { name, price, weight, colour, subtype, units, value, shape } = req.body;

        if (!req.file) {
          return res.status(400).json({ error: 'Image file is required' });
        }

        const image = req.file.buffer.toString('base64');

        if (!name || !price || !weight || !colour || !subtype || !units || !value || !shape) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        const diamond = new Diamonds({ name, price, weight, colour, subtype, units, value, shape, image });
        const savedDiamond = await diamond.save();

        res.status(201).json(savedDiamond);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
  ],

  deleteDiamond: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Diamond ID is required' });
      }

      const deletedDiamond = await Diamonds.findByIdAndDelete(id);

      if (!deletedDiamond) {
        return res.status(404).json({ error: 'Diamond not found' });
      }

      res.status(200).json({ message: 'Diamond deleted successfully', deletedDiamond });
    } catch (error) {
      console.error('Error deleting diamond:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default diamondsController;
