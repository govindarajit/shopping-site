const express = require('express');
const AuthController = require('../controllers/AuthController');
const token = require('../middleware/token');
const router = express.Router();
// const multer = require('multer');
// const Storages = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "_" + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// const upload = multer({
//     storage: Storages,
//     limits: {
//         fieldSize: 1024 * 1024 * 20  //20MB
//     },
//     fileFilter: fileFilter
// });

router.post('/signup', AuthController.signup);
router.post('/login',  AuthController.login);
router.get('/getUserDetail', AuthController.getUserDetail);

// router.post('/signup', upload.single('photo'), AuthController.signup);
// router.post('/emailVerify/:cryptoToken', AuthController.emailVerify);
// router.post('/checkOldPassword', token, AuthController.checkOldPassword);
// router.post('/changePassword', token, AuthController.changePassword);
// router.get('/getProfile', token, AuthController.getProfile);
// router.post('/updateProfile', token, AuthController.updateProfile);
// router.post('/changeProfilePic', upload.single('photo'), token, AuthController.changeProfilePic);


module.exports = router;