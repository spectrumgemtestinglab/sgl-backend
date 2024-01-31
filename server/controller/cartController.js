// cartController.js
import Cart from '../model/cartModel.js'// Assuming the path is correct

// Controller function to handle the creation of a new cart item
export const createCartItem = async (req, res) => {
  try {
    // Assuming you are passing the cart data in the request body
    const {
      _id,
      quantity,
      image,
      name,
      price,
      weight,
      colour,
      units,
      value,
      shape,
      dimensions,
      transparency,
      hardness,
      microscopicexamination,
      size,
      clarity,
      subtype,
    } = req.body;

    // Creating a new Cart instance
    const newCartItem = new Cart({
      _id,
      quantity,
      image,
      name,
      price,
      weight,
      colour,
      units,
      value,
      shape,
      dimensions,
      transparency,
      hardness,
      microscopicexamination,
      size,
      clarity,
      subtype,
    });

    // Saving the new cart item to the database
    await newCartItem.save();

    // Sending a success response
    res.status(201).json({ message: 'Cart item created successfully', cartItem: newCartItem });
  } catch (error) {
    // Handling errors
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export default{
  createCartItem
}