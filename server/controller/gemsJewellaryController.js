import GemsJewellary from '../model/gemsJewellaryModel.js';
import multer from 'multer';
//
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const gemsJewellaryController = {
  getAllGems: async (req, res) => {
    try {
      const gems = await GemsJewellary.find();
      res.status(200).json(gems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createGem: [
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

        const gem = new GemsJewellary({ name, price, image, weight, colour, subtype, units, value, shape, dimenensions, transparency, hardness, microscopicexamination });
        const savedGem = await gem.save();

        res.status(201).json(savedGem);
      } catch (error) {
        console.error('Error creating GemsJewellary:', error);
        res.status(400).json({ error: 'Failed to create GemsJewellary', details: error.message });
      }
    }
  ],

  deleteGem: async (req, res) => {
    try {
      const { id } = req.params;
      const gem = await GemsJewellary.findById(id);

      if (!gem) {
        return res.status(404).json({ error: 'Gem not found' });
      }

      await GemsJewellary.deleteOne({ _id: id });

      res.status(200).json({ message: 'Gem deleted successfully' });
    } catch (error) {
      console.error('Error deleting Gem:', error);
      res.status(500).json({ error: 'Failed to delete Gem', details: error.message });
    }
  }
};

export default gemsJewellaryController;
