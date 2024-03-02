
import multer from "multer";
import LooseDiamonds from '../model/looseDiamondsModel.js'

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const looseDiamondsController = {
  getAllDiamonds: async (req, res) => {
    try {
      const loose = await LooseDiamonds.find();
      res.status(200).json(loose);
    } catch (error) {
      console.error('Error fetching Loos diamonds:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createDiamonds: [
    upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]),
    async (req, res) => {
      try {
        const { name, price, weight, colour, subtype, units, shape, dimensions, description } = req.body;

        if (!req.files || !req.files['image1'] || !req.files['image2']) {
          return res.status(400).json({ error: 'Both image files are required' });
        }

        const image1 = req.files['image1'][0].buffer.toString('base64');
        const image2 = req.files['image2'][0].buffer.toString('base64');

        if (!name || !price || !weight || !colour || !subtype || !units || !shape || !dimensions || !description) {
          return res.status(400).json({ error: 'Gems name, price, weight, colour, subtype, units, shape, dimensions, and description are required' });
        }

        const loose = new LooseDiamonds({ name, price, weight, colour, subtype, units, shape, dimensions, description, image1, image2 });
        const savedDiamonds = await loose.save();

        res.status(201).json(savedDiamonds);
      } catch (error) {
        console.error('Error creating Diamonds:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  ],

  deleteDiamonds: async (req, res) => {
    try {
      const diamondId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(gemId)) {
        return res.status(400).json({ error: 'Invalid Daimond ID' });
      }

      const deleteDiamond = await LooseDiamonds.findByIdAndDelete(diamondId);

      if (!deleteDiamond) {
        return res.status(404).json({ error: 'Diamond not found' });
      }

      res.status(200).json({ message: 'Diamond deleted successfully', deleteDiamond });
    } catch (error) {
      console.error('Error deleting gem:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default looseDiamondsController;
