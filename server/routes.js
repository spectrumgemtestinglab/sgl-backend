import express from 'express';
import inventoryController from './controller/inventoryController.js';
import ordersController from './controller/ordersController.js';
import gemsController from './controller/gemsController.js';
import diamondsController from './controller/diamondsController.js';
import jewelryController from './controller/diamnodsJewellaryController.js';
import pearlsController from './controller/pearlsController.js';
import coralsController from './controller/coralsController.js';
import userOrderController from './controller/userOrderController.js'
import beadsController from './controller/beadsController.js';
import blogsController from './controller/blogsController.js';
import zodiacController from './controller/zodiacController.js';
import contactController from './controller/contactController.js';
import astrologyGemsController from './controller/astrologyGemsController.js';
import whishlistController from './controller/whishlistController.js';
import chandraController from './controller/chandraControler.js';
import multer from 'multer'
import looseDiamondsController from './controller/looseDiamondsController.js';
import cartController from './controller/cartController.js';
import loginController from './controller/loginController.js';
import authenticateToken from './controller/authMiddleware.js';


const upload = multer({ dest: 'uploads/' });


const router = express.Router();

router.post("/inventorypost",authenticateToken,inventoryController.createInventoryItem);
router.get("/inventoryget", inventoryController.getAllInventoryItems);
router.delete("/deleteinventory/:id",authenticateToken, inventoryController.deleteInventoryItem);

router.post("/postblogs",authenticateToken, blogsController.createBlog);
router.get("/getblogs", blogsController.getAllBlogs);
router.delete("/deleteblogs/:id",authenticateToken, blogsController.deleteBlog);

router.post("/createOrder",authenticateToken, ordersController.createOrder);
router.post("/addItemToOrder/:orderId",authenticateToken, ordersController.addItemToOrder);
router.get("/getAllOrders", ordersController.getAllOrders);
router.put("/update/:orderId",authenticateToken, ordersController.updateOrder);
router.patch("/update/:id",authenticateToken, ordersController.updateOrder);
router.delete('/deleteOrder/:id',authenticateToken, ordersController.deleteOrder);


router.post("/postgems",authenticateToken, gemsController.createGem);
router.get("/getgems", gemsController.getAllGems);
router.delete("/deletegems/:id",authenticateToken, gemsController.deleteGem);

router.post("/postbeads",authenticateToken, beadsController.createBeads);
router.get("/getbeads", beadsController.getBead);
router.delete("/deletebeads/:id",authenticateToken, beadsController.deleteBeads);

router.post("/postdiamonds",authenticateToken, diamondsController.createDiamond);
router.get("/getdiamonds", diamondsController.getAllDiamonds);
router.delete("/deletediamonds/:id",authenticateToken, diamondsController.deleteDiamond);

router.post("/postjewelry",authenticateToken, jewelryController.createJewellary);
router.get("/getjewelry",jewelryController.getAlljewelry);
router.delete("/deletejewelry/:id",authenticateToken, jewelryController.deletejewelry);

router.post("/postpearls",authenticateToken, pearlsController.createPearls);
router.get("/getpearls", pearlsController.getAllPearls);
router.delete("/deletepearls/:id",authenticateToken, pearlsController.deletePearls);

router.post("/postcorals",authenticateToken, coralsController.createCorals);
router.get("/getcorals", coralsController.getCorals);
router.delete("/deletecorals/:id",authenticateToken, coralsController.deleteCorals);

router.post("/postuserorder",authenticateToken, userOrderController.createUserOrder);
router.get("/getuserorder", userOrderController.getAllUserOrders);
router.delete("/deleteuserorder/:id",authenticateToken, userOrderController.deleteUserOrder);
router.put('/user-orders/:id',authenticateToken, userOrderController.updateUserOrder);


router.post('/postzodiacstones',authenticateToken, zodiacController.createZodiac);
router.get("/getzodiacstones", zodiacController.getZodiac);
router.delete("/deletezodiacstones/:id",authenticateToken, zodiacController.deleteZodiac);

router.post("/postcontact",authenticateToken,contactController.createContact)
router.get("/getallcontact",contactController.getAllContact)
router.delete("/deleteconatct/:id",authenticateToken,contactController.deleteContact)


router.post("/postloosediamonds",authenticateToken,looseDiamondsController.createDiamonds)
router.get("/getloosedimonds",looseDiamondsController.getAllDiamonds)
router.delete('/diamonds/:id',authenticateToken,looseDiamondsController.deleteDiamonds);



router.post("/astrologygemspost",authenticateToken,astrologyGemsController.createAstrologyGems)

router.get("/getastrologygems", astrologyGemsController.getAllAstrologyGems);

router.delete("/deleteastrologygems/:id",authenticateToken,astrologyGemsController.deleteAstrologyGems)


router.post("/createwhishlist",authenticateToken,whishlistController.createWhishlist)
router.get("/getwhishlist",whishlistController.getAllWhishlist)
router.delete('/deletewhishlist/:id',authenticateToken,whishlistController.deleteWhishlist)

router.post('/postchandra',authenticateToken, upload.array('images'), chandraController.createChandra);
router.get('/getallchandra', chandraController.getAllChandra);
router.delete('/deletechandra/:id',authenticateToken, chandraController.deleteChandra);

router.post("/create",authenticateToken,cartController.createCartItem)
router.get('/cart-items', cartController.getAllCartItems);
router.get('/getCartItemById/:userIds', cartController.getByUserIds);
router.delete('/deleteuserIds/:userIds',cartController.deleteCartuserIds)

router.delete("/deletecartItems/:id",cartController.deleteCartItem)
router.post('/deleteCart', cartController.deleteUserCart);
router.delete('/deleteAll',authenticateToken, cartController.deleteAllCartItems);


router.post('/signup', loginController.signup);
router.post('/login', loginController.login);
router.post('/generate-otp', loginController.generateOTP);
router.post('/verify-otp', loginController.verifyOTP);
router.post("/reset-password",loginController.resetPassword)
router.patch('/update-password',loginController.updatePassword)
router.get('/user/:email', loginController.getUserByEmail);




export default router;

