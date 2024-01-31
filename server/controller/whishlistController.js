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

// Controller function to delete a specific Whishlist item by ID
export const deleteWhishlist = async (req, res) => {
  const { itemId } = req.params;

  try {
    // Find and delete the Whishlist item by ID
    const deletedWhishlist = await Whishlist.findByIdAndDelete(itemId);

    if (!deletedWhishlist) {
      return res.status(404).json({ message: 'Whishlist item not found' });
    }

    // Sending a success response
    res.status(200).json({ message: 'Whishlist item deleted successfully', deletedWhishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {
  createWhishlist,
  getAllWhishlist,
  deleteWhishlist,
};
