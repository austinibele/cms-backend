"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
// The import below is a placeholder for future image processing logic
// import { processUploadedFile } from '../services/fileProcessing.service';
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5252/api/';
    if (!req.file) {
        return res.status(400).send({ success: 0, message: 'No file uploaded.' });
    }
    try {
        // Placeholder for future image processing logic
        // await processUploadedFile(req.file);
        const url = baseUrl + req.file.path.replace(/\\/g, '/');
        res.send({
            success: 1,
            file: {
                url,
            },
        });
    }
    catch (error) {
        res.status(500).send({ success: 0, message: 'Error processing the file.' });
    }
});
exports.uploadImage = uploadImage;
