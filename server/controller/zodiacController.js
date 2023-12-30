import Zodiac from '../model/zodiacModel.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const zodiacController = {
  getZodiac: async (req, res) => {
    try {
      const zodiac = await Zodiac.find();
      res.status(200).json(zodiac);
    } catch (error) {
      console.error('Error fetching zodiac:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createZodiac: [
    upload.single('image'),
    async (req, res) => {
      try {
        const { name, price, weight, colour, subtype, units, value, shape } = req.body;

        if (!req.file) {
          return res.status(400).json({ error: 'Image file is required' });
        }

        const image = req.file.buffer.toString('base64');

        if (!name || !price) {
          return res.status(400).json({ error: 'Zodiac name and price are required' });
        }

        const newZodiac = new Zodiac({ name, price, image, weight, colour, subtype, units, value, shape });
        const savedZodiac = await newZodiac.save();

        res.status(201).json(savedZodiac);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
  ],

  deleteZodiac: async (req, res) => {
    try {
      const { id } = req.params;
      const zodiac = await Zodiac.findById(id);

      if (!zodiac) {
        return res.status(404).json({ error: 'Zodiac not found' });
      }

      await Zodiac.deleteOne({ _id: id });

      res.status(204).json({ message: 'Zodiac deleted successfully' });
    } catch (error) {
      console.error('Error deleting Zodiac:', error);
      res.status(500).json({ error: 'Failed to delete Zodiac', details: error.message });
    }
  },
};

export default zodiacController;
