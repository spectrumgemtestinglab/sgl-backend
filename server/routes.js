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
import cartController from './controller/Cart.js';


const upload = multer({ dest: 'uploads/' });


const router = express.Router();


router.post("/inventorypost", inventoryController.createInventoryItem);
router.get("/inventoryget", inventoryController.getAllInventoryItems);
router.delete("/deleteinventory/:id", inventoryController.deleteInventoryItem);

router.post("/postblogs", blogsController.createBlog);
router.get("/getblogs", blogsController.getAllBlogs);
router.delete("/deleteblogs/:id", blogsController.deleteBlog);

router.post("/createOrder", ordersController.createOrder);
router.post("/addItemToOrder/:orderId", ordersController.addItemToOrder);
router.get("/getAllOrders", ordersController.getAllOrders);
router.put("/update/:orderId", ordersController.updateOrder);
router.patch("/update/:id", ordersController.updateOrder);
router.delete('/deleteOrder/:id', ordersController.deleteOrder);


router.post("/postgems", gemsController.createGem);
router.get("/getgems", gemsController.getAllGems);
router.delete("/deletegems/:id", gemsController.deleteGem);

router.post("/postbeads", beadsController.createBeads);
router.get("/getbeads", beadsController.getBead);
router.delete("/deletebeads/:id", beadsController.deleteBeads);

router.post("/postdiamonds", diamondsController.createDiamond);
router.get("/getdiamonds", diamondsController.getAllDiamonds);
router.delete("/deletediamonds/:id", diamondsController.deleteDiamond);

router.post("/postjewelry", jewelryController.createJewellary);
router.get("/getjewelry", jewelryController.getAlljewelry);
router.delete("/deletejewelry/:id", jewelryController.deletejewelry);

router.post("/postpearls", pearlsController.createPearls);
router.get("/getpearls", pearlsController.getAllPearls);
router.delete("/deletepearls/:id", pearlsController.deletePearls);

router.post("/postcorals", coralsController.createCorals);
router.get("/getcorals", coralsController.getCorals);
router.delete("/deletecorals/:id", coralsController.deleteCorals);

router.post("/postuserorder", userOrderController.createUserOrder);
router.get("/getuserorder", userOrderController.getAllUserOrders);
router.delete("/deleteuserorder/:id", userOrderController.deleteUserOrder);
router.put('/user-orders/:id', userOrderController.updateUserOrder);


router.post('/postzodiacstones', zodiacController.createZodiac);
router.get("/getzodiacstones", zodiacController.getZodiac);
router.delete("/deletezodiacstones/:id", zodiacController.deleteZodiac);

router.post("/postcontact",contactController.createContact)
router.get("/getallcontact",contactController.getAllContact)
router.delete("/deleteconatct/:id",contactController.deleteContact)


router.post("/postloosediamonds",looseDiamondsController.createDiamonds)
router.get("/getloosedimonds",looseDiamondsController.getAllDiamonds)
router.delete("/deletediamonds/:id",looseDiamondsController.deleteDiamonds)



router.post("/astrologygemspost",astrologyGemsController.createAstrologyGems)

router.get("/getastrologygems", astrologyGemsController.getAllAstrologyGems);

router.delete("/deleteastrologygems/:id",astrologyGemsController.deleteAstrologyGems)


router.post("/createwhishlist",whishlistController.createWhishlist)
router.get("/getwhishlist",whishlistController.getAllWhishlist)
router.delete('/deletewhishlist/:id',whishlistController.deleteWhishlist)

router.post('/postchandra', upload.array('images'), chandraController.createChandra);
router.get('/getallchandra', chandraController.getAllChandra);
router.delete('/deletechandra/:id', chandraController.deleteChandra);

router.post("/createcart",cartController.createCart)
router.get("/getAllCart",cartController.getAllCart)
router.get("/getById/:userIds",cartController.getByUserIds)


// router.get("/getAllCart",cartController.getAllCart)
// router.get("/getById/:id",cartController.getCartByUserId)

export default router;

