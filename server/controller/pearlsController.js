// pearlsController.js
import Pearls from '../model/pearlsModel.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const pearlsController = {
  getAllPearls: async (req, res) => {
    try {
      const pearls = await Pearls.find();
      res.status(200).json(pearls);
    } catch (error) {
      console.error('Error fetching pearls:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createPearls: [
    upload.single('image'),
    async (req, res) => {
      try {
        const { name, price, weight, colour, subtype, units, value, shape } = req.body;

        if (!req.file) {
          return res.status(400).json({ error: 'Image file is required' });
        }

        const image = req.file.buffer.toString('base64');

        if (!name || !price || !weight || !colour) {
          return res.status(400).json({ error: 'Pearls name, price, weight, and colour are required' });
        }

        const pearls = new Pearls({ name, price, image, weight, colour, subtype, units, value, shape });
        const savedPearls = await pearls.save();

        res.status(201).json(savedPearls);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
  ],

  deletePearls: async (req, res) => {
    try {
      const { id } = req.params;
      const pearls = await Pearls.findById(id);

      if (!pearls) {
        return res.status(404).json({ error: 'Pearls not found' });
      }

      await Pearls.deleteOne({ _id: id });

      res.status(204).json({ message: 'Pearls deleted successfully' });
    } catch (error) {
      console.error('Error deleting Pearls:', error);
      res.status(500).json({ error: 'Failed to delete Pearls', details: error.message });
    }
  },
};

export default pearlsController;
