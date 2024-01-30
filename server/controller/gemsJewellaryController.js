// gemsJewellaryController.js
import GemsJewellary from '../model/gemsJewellaryModel.js'

const gemsJewellaryController = {
  createGem: async (req, res) => {
    try {
      const gemData = req.body;
      const newGem = new GemsJewellary(gemData);
      const savedGem = await newGem.save();

      res.status(201).json(savedGem);
    } catch (error) {
      console.error('Error creating gem:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllGems: async (req, res) => {
    try {
      const gems = await GemsJewellary.find();
      res.status(200).json(gems);
    } catch (error) {
      console.error('Error getting gems:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteGem: async (req, res) => {
    try {
      const gemId = req.params.id;

      const deletedGem = await GemsJewellary.findByIdAndDelete(gemId);

      if (!deletedGem) {
        return res.status(404).json({ error: 'Gem not found' });
      }

      res.status(200).json({ message: 'Gem deleted successfully' });
    } catch (error) {
      console.error('Error deleting gem:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default gemsJewellaryController;
