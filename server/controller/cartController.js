// cartController.js
import Cart from '../model/cartModel.js'; 


export const createCartItem = async (req, res) => {
  console.log(req.body);
  try {
    
    const newCartItem = new Cart(req.body);

 
    await newCartItem.save();

   
    res.status(201).json({ message: 'Cart item created successfully', cartItem: newCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



export const getAllCartItems = async (req, res) => {
  try {
    
    const cartItems = await Cart.find();

   
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    await Cart.deleteOne({ _id: id });

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting Cart:', error);
    res.status(500).json({ error: 'Failed to delete Cart', details: error.message });
  }
};



export default {
  createCartItem,
  getAllCartItems,
  deleteCartItem,
};
