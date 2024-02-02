// chandraController.js
import Chandra from '../model/chandraModel.js';

const chandraController = {
  createChandra: async (req, res) => {
    try {
      const { name, price } = req.body;
      const images = req.files.map((file) => file.path);

      const newChandra = await Chandra.create({
        images,
        name,
        price,
      });

      res.status(201).json(newChandra);
    } catch (error) {
      console.error('Error creating Chandra:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllChandra: async (req, res) => {
    try {
      const allChandra = await Chandra.find();
      res.status(200).json(allChandra);
    } catch (error) {
      console.error('Error getting all Chandra:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteChandra: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Chandra ID is required for deletion' });
      }

      const deleteChandra = await Chandra.findByIdAndDelete(id);

      if (!deleteChandra) {
        return res.status(404).json({ error: 'Chandra not found' });
      }

      res.status(200).json(deleteChandra);
    } catch (error) {
      console.error('Error deleting Chandra:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default chandraController;
