import AstrologyGems from '../model/astrologyGemsModel.js';
import Beads from '../model/beadsModel.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const astrologyGemsController = {
  createAstrologyGems: [
    upload.single('image'),
    async (req, res) => {
      try {
        const { name, price, weight, colour, subtype, units, value, shape, dimenensions, transparency, hardness, microscopicexamination } = req.body;

        if (!req.file) {
          return res.status(400).json({ error: 'Image file is required' });
        }

        const image = req.file.buffer.toString('base64');

        if (!name || !price || !weight || !colour || !subtype || !units || !value || !shape || !dimenensions || !transparency || !hardness || !microscopicexamination) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        const astrologyGems = new AstrologyGems({
          name,
          price,
          image,
          weight,
          colour,
          subtype,
          units,
          value,
          shape,
          dimenensions,
          transparency,
          hardness,
          microscopicexamination,
        });

        const savedAstrologyGems = await astrologyGems.save();

        res.status(201).json(savedAstrologyGems);
      } catch (error) {
        console.error('Error creating AstrologyGems:', error);
        res.status(400).json({ error: 'Failed to create AstrologyGems', details: error.message });
      }
    },
  ],

  getAllAstrologyGems: async (req, res) => {
    try {
      const astrologyGems = await AstrologyGems.find();
      res.status(200).json(astrologyGems);
    } catch (error) {
      console.error('Error getting AstrologyGems:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteAstrologyGems: async (req, res) => {
    try {
      const { id } = req.params;
      const astrologyGems = await AstrologyGems.findById(id);

      if (!astrologyGems) {
        return res.status(404).json({ error: 'AstrologyGems not found' });
      }

      await AstrologyGems.deleteOne({ _id: id });

      res.status(200).json({ message: 'AstrologyGems deleted successfully' });
    } catch (error) {
      console.error('Error deleting AstrologyGems:', error);
      res.status(500).json({ error: 'Failed to delete AstrologyGems', details: error.message });
    }
  },
};

export default astrologyGemsController;
