"use strict";
// src/controllers/fetchContent.controller.ts
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
exports.fetchContentController = void 0;
const fetchContent_service_1 = require("../services/fetchContent.service");
const fetchContentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentOption, segment } = req.params;
    try {
        const content = yield (0, fetchContent_service_1.fetchContent)(contentOption, segment);
        res.json(content);
    }
    catch (error) {
        if (error.message === 'Content not found') {
            res.status(404).send(error.message);
        }
        else {
            res.status(500).send('Error reading content');
        }
    }
});
exports.fetchContentController = fetchContentController;
