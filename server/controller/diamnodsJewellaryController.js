import Jewelry from '../model/diamondsJewellaryModel.js'
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const jewelryController = {
  getAlljewelry: async function (req, res) {
    try {
      const allJewelry = await Jewelry.find(); 
      res.status(200).json(allJewelry);
    } catch (error) {
      console.error('Error fetching jewelry:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createJewellary: [
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
          return res.status(400).json({ error: 'Jewellary name, price, weight, colour, subtype, units, shape, dimensions, and description are required' });
        }

        const jewellary = new Jewelry({ name, price, weight, colour, subtype, units, shape, dimensions, description, image1, image2 });
        const savedJewellary = await jewellary.save();

        res.status(201).json(savedJewellary);
      } catch (error) {
        console.error('Error creating Jewellary:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  ],


  deletejewelry: async function (req, res) {
    try {
      const { id } = req.params;
      const jewelryItem = await Jewelry.findById(id); 

      if (!jewelryItem) {
        return res.status(404).json({ error: 'Jewelry not found' });
      }

      await jewelryItem.deleteOne({ _id: id });

      res.status(204).json({ message: 'Jewelry deleted successfully' });
    } catch (error) {
      console.error('Error deleting jewelry:', error);
      res.status(500).json({ error: 'Failed to delete jewelry', details: error.message });
    }
  }
};

export default jewelryController;



