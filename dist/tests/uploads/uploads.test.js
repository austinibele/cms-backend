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
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const server = require("../../server");
describe('GET /api/database/uploads/:imageName', () => {
    ////////////////////////////////////////
    let originalConsoleError;
    beforeEach(() => {
        // Store the original console.error
        originalConsoleError = console.error;
    });
    afterEach(() => {
        // Restore the original console.error
        console.error = originalConsoleError;
    });
    ////////////////////////////////////////
    it('should retrieve an uploaded image', () => __awaiter(void 0, void 0, void 0, function* () {
        const testImageName = "test.png";
        const res = yield (0, supertest_1.default)(server)
            .get(`/api/database/uploads/${testImageName}`)
            .expect('Content-Type', /^image/)
            .expect(200);
        // Since we are sending a file, we check if the body is not empty
        (0, chai_1.expect)(res.body).to.not.be.empty;
    }));
    it('should return a 404 error for non-existent images', () => __awaiter(void 0, void 0, void 0, function* () {
        console.error = function () { };
        try {
            const res = yield (0, supertest_1.default)(server)
                .get('/api/database/uploads/nonexistent.png')
                .expect(404);
            (0, chai_1.expect)(res.text).to.equal('Not Found');
        }
        catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error
        }
    }));
    after(() => {
        server.close();
    });
});
