const express = require('express');
const apiController = require('../controller/apiController');
const upload = require('../middleware/apiSection'); // Correct import



const router = express.Router();

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Store files in 'uploads' directory
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// const upload = multer({ storage: storage });

// User routes
router.get('/users', apiController.getUsers);
router.get('/users/:phoneNumber', apiController.getUserById);
router.post('/users', upload, apiController.createUser);
router.put('/users/:phoneNumber', upload, apiController.updateUser);


// router.post('/users', upload.fields([{name:'image'},{name:'pdfFile'},]), apiController.createUser);
// router.post('/users', upload.single('image'), apiController.createUser);
// router.put('/users/:phoneNumber', upload.fields([{name:'image'},{name:'pdfFile'},]), apiController.updateUser);
router.delete('/users/:phoneNumber', apiController.deleteUser);

module.exports = router;







// const express = require('express');
// const router = express.Router();
// const apiController = require('../controller/apiController');



// router.get("/", (req, res) => {
//     res.send("API is working ");
// });

// // User Routes
// router.get('/users', apiController.getUsers);
// router.get('/users/:phoneNumber', apiController.getUserById);
// router.post('/users', apiController.createUser);
// router.put('/users/:phonenumber', apiController.updateUser);
// router.delete('/users/:phoneNumber', apiController.deleteUser);

// module.exports = router;














/*

const express = require('express');
const router = express.Router();
const userController = require('../controller/apiController');




router.get("/", (req, res) => {
    res.send("API is working ");
});

module.exports = router;  // Make sure you export the router properly

// User Routes
router.get('/users',userController.getUsers);
router.get('/user/:phoneNumber',userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);






* */