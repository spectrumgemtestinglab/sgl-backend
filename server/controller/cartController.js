// cartController.js
import Cart from '../model/cartModel.js'; 


export const createCartItem = async (req, res) => {
  console.log(req.body);
  try {
    const newCartItem = new Cart(req.body);
    await newCartItem.save();
    res.status(201).json({ message: 'Cart item created successfully', cartItem: newCartItem });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllCartItems = async (req, res) => {
  try {
   
    const cartItems = await Cart.find();
    res.status(200).json({ cartItems });
  }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const deleteCartItem = async (req, res) => {
  const { itemId } = req.params;

  try {
   
    const deletedCartItem = await Cart.findByIdAndDelete(itemId);

    if (!deletedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    
    res.status(200).json({ message: 'Cart item deleted successfully', deletedCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {
  createCartItem,
  getAllCartItems,
  deleteCartItem,
};
