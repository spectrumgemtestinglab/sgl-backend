import AstrologyGems from '../model/astrologyGemsModel.js'

const astrologyGemsController = {
  createAstrologyGems: async (req, res) => {
    try {
      const newAstrologyGems = await AstrologyGems.create(req.body);
      res.status(201).json(newAstrologyGems);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllAstrologyGems: async (req, res) => {
    try {
      const astrologyGemsList = await AstrologyGems.find();
      res.status(200).json(astrologyGemsList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteAstrologyGems: async (req, res) => {
    try {
      const deletedAstrologyGems = await AstrologyGems.findByIdAndDelete(
        req.params.id
      );
      if (!deletedAstrologyGems) {
        return res.status(404).json({ error: 'Astrology Gems not found' });
      }
      res.status(200).json(deletedAstrologyGems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default astrologyGemsController;
