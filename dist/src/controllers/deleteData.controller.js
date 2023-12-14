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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDataController = void 0;
const fileSystem_utils_1 = __importDefault(require("../utils/fileSystem.utils"));
const deleteDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deletePath } = req.body;
    try {
        yield fileSystem_utils_1.default.deleteFile(deletePath);
        res.json({ message: 'Data deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting file', error);
        if (error.code === 'ENOENT') {
            res.status(404).json({ message: 'File not found' });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});
exports.deleteDataController = deleteDataController;
