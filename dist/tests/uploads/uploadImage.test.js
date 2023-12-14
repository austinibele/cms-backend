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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const server = require("../../server");
describe('POST /api/uploadImage', () => {
    const testImagePath = path_1.default.join(process.cwd(), 'tests/uploads/test.png');
    it('should upload an image and return the URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server)
            .post('/api/uploadImage')
            .attach('image', fs_1.default.readFileSync(testImagePath), 'test.png')
            .expect('Content-Type', /json/)
            .expect(200);
        (0, chai_1.expect)(res.body).to.have.property('success');
        (0, chai_1.expect)(res.body.success).to.equal(1);
        (0, chai_1.expect)(res.body.file).to.have.property('url');
    }));
    after(() => {
        server.close();
    });
});
