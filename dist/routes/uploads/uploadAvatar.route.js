"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
// Multer Disk Storage Setup
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        const dir = 'database/uploads/';
        fs_1.default.access(dir, (err) => {
            if (err) {
                return fs_1.default.mkdir(dir, { recursive: true }, (error) => cb(error, dir));
            }
            else {
                return cb(null, dir);
            }
        });
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${(0, uuid_1.v4)()}${path_1.default.extname(file.originalname)}`);
    },
});
// Check File Type Function
const checkFileType = (file, cb) => {
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb('Error: Images Only!');
    }
};
// Initialize Upload Variable
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single('image');
// POST Endpoint for Image Upload
router.post('/:userId/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        else {
            if (req.file == undefined) {
                res.status(400).json({ message: 'No file selected!' });
            }
            else {
                // Here, you would typically update the user's avatar URL in your database
                // For example, save the file path to the user's record in the database
                // Construct the URL to access the file
                const url = `http://localhost:3000/uploads/${req.file.filename}`;
                res.json({
                    success: 1,
                    file: {
                        url,
                    },
                });
            }
        }
    });
});
module.exports = router;
