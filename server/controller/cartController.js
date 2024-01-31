// cartController.js
import Cart from '../model/cartModel.js'// Assuming the path is correct

// Controller function to handle the creation of a new cart item
export const createCartItem = async (req, res) => {
  console.log(req.body);
  try {
    // Create a new Cart instance with all the data from the request body
    const newCartItem = new Cart(req.body);

    // Save the new cart item to the database
    await newCartItem.save();

    // Sending a success response
    res.status(201).json({ message: 'Cart item created successfully', cartItem: newCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export default{
  createCartItem
}