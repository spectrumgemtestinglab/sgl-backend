// cartController.js

import Whishlist from '../model/whishlistModel.js';

// Controller function to handle the creation of a new cart item
export const createWhishlist = async (req, res) => {
  console.log(req.body);
  try {
    // Create a new Whishlist instance with all the data from the request body
    const newWhishlist = new Whishlist(req.body);

    // Save the new Whishlist item to the database
    await newWhishlist.save();

    // Sending a success response
    res.status(201).json({ message: 'Whishlist item created successfully', whishlist: newWhishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to retrieve all Whishlist items
export const getAllWhishlist = async (req, res) => {
  try {
    // Retrieve all Whishlist items from the database
    const whishlist = await Whishlist.find();

    // Sending a success response
    res.status(200).json({ whishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const deleteWhishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const whishlist = await Whishlist.findById(id);

    if (!whishlist) {
      return res.status(404).json({ error: 'Whishlist not found' });
    }

    await Whishlist.deleteOne({ _id: id });

    res.status(200).json({ message: 'Whishlist deleted successfully' });
  } catch (error) {
    console.error('Error deleting Whishlist:', error);
    res.status(500).json({ error: 'Failed to delete Whishlist', details: error.message });
  }
};
export default {
  createWhishlist,
  getAllWhishlist,
  deleteWhishlist,
};
