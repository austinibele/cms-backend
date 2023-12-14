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
exports.saveDataController = void 0;
const fileSystem_utils_1 = __importDefault(require("../utils/fileSystem.utils"));
const saveDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentOption, segment, data } = req.body;
    if (!isValidContentOption(contentOption)) {
        res.status(400).json({ message: 'Invalid content option' });
        return;
    }
    try {
        yield fileSystem_utils_1.default.saveFile(contentOption, segment, data);
        res.status(200).json({ message: 'Data saved successfully.' });
    }
    catch (error) {
        console.error('Error writing to file', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});
exports.saveDataController = saveDataController;
const isValidContentOption = (contentOption) => {
    return typeof contentOption === 'string' &&
        !contentOption.includes('/') &&
        !contentOption.includes('.json');
};
