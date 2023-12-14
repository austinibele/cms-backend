"use strict";
// src/controllers/contentPaths.controller.ts
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
exports.getContentPathsController = void 0;
const contentPaths_service_1 = require("../services/contentPaths.service");
const getContentPathsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentOption } = req.params;
    try {
        const segments = yield (0, contentPaths_service_1.getContentPaths)(contentOption);
        res.json(segments);
    }
    catch (error) {
        if (error.message === 'Content option not found') {
            res.status(404).send(error.message);
        }
        else {
            res.status(500).send('Error processing request');
        }
    }
});
exports.getContentPathsController = getContentPathsController;
