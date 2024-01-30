import Chandra from '../model/chandraModel.js';

const chandraController = {
  createChandra: async (req, res) => {
    try {
      const { id, items, totalItems } = req.body;

      const newChandra = await Chandra.create({
        id,
        items,
        totalItems,
      });

      res.status(201).json(newChandra);
    } catch (error) {
      console.error('Error creating Chandra:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllChandra: async (req, res) => {
    try {
      console.log('Fetching all Chandra...');
      const allChandra = await Chandra.find();
      console.log('Fetched Chandra:', allChandra);

      res.status(200).json(allChandra);
    } catch (error) {
      console.error('Error getting all Chandra:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  editChandra: async (req, res) => {
    try {
      const { id } = req.params;
      const existingChandra = await Chandra.findById(id);

      if (!existingChandra) {
        return res.status(404).json({ error: 'Chandra not found' });
      }

      res.status(200).json(existingChandra);
    } catch (error) {
      console.error('Error editing Chandra:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateChandra: async (req, res) => {
    try {
      const { id } = req.params;
      console.log('Received Chandra ID for Update:', id);

      // Update logic here...

      res.status(200).json({ message: 'Chandra updated successfully', updatedChandra });
    } catch (error) {
      console.error('Error updating Chandra:', error);
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

  addToNewChandra: async (req, res) => {
    try {
      const { id } = req.params;
      const { newItem } = req.body;

      const existingChandra = await Chandra.findById(id);

      if (!existingChandra) {
        return res.status(404).json({ error: 'Chandra not found' });
      }

      existingChandra.items.push(newItem);

      const updatedChandra = await existingChandra.save();

      res.status(200).json(updatedChandra);
    } catch (error) {
      console.error('Error adding item to Chandra:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateItemInChandra: async (req, res) => {
    try {
      const { id, itemId } = req.params;
      const { updatedItem } = req.body;

      const existingChandra = await Chandra.findById(id);

      if (!existingChandra) {
        return res.status(404).json({ error: 'Chandra not found' });
      }

      const existingItemIndex = existingChandra.items.findIndex(item => item._id == itemId);

      if (existingItemIndex === -1) {
        return res.status(404).json({ error: 'Item not found in Chandra' });
      }

      existingChandra.items[existingItemIndex] = { ...existingChandra.items[existingItemIndex], ...updatedItem };

      const updatedChandra = await existingChandra.save();

      res.status(200).json(updatedChandra);
    } catch (error) {
      console.error('Error updating item in Chandra:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default chandraController;
