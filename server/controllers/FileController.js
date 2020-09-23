const httpStatus = require('http-status');
const path = require("path");
const multer = require('multer');

// const filePath = path.join(__dirname, '../../frontend/src/assets/images');
const filePath = path.join(__dirname, '../../frontend/src/');

let absPath = "";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, filePath);
    },
    filename: function (req, file, callback) {
        const arr = file.originalname.split('.');
        const fileExt = arr[arr.length - 1];
        const filename = file.fieldname + '-' + Date.now() + '.' + fileExt;
        absPath = '../../assets/images' + "/" + filename;
        callback(null, filename);
    }
});

//'file' is the name of passing parameters
const upload = multer({
    storage: storage
}).single('file');

module.exports = {

    uploadFile: async (req, res, next) => {
        upload(req, res, function (err) {
            if (err) {
                console.log(err);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send("error");
                return;
            }
            res.status(httpStatus.OK).json({
                filePath: absPath
            });
        });
    },



};