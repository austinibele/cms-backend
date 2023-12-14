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
describe('GET /api/pages', () => {
    // Assuming we have a known locale and slug that should return a valid page
    const locale = 'en';
    const slug = 'home';
    it('should retrieve a page JSON based on slug and locale', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server)
            .get('/api/pages')
            .query({ locale: locale, filters: { slug: slug } })
            .expect('Content-Type', /json/)
            .expect(200);
        (0, chai_1.expect)(res.body).to.be.an('object');
        (0, chai_1.expect)(res.body).to.have.property('data');
        (0, chai_1.expect)(res.body).to.have.property('meta');
        (0, chai_1.expect)(res.body.data).to.be.an('array');
    }));
    it('should return an error if slug or locale is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server)
            .get('/api/pages')
            .query({}) // No query parameters provided
            .expect(400);
        (0, chai_1.expect)(res.text).to.equal('Slug and locale are required.');
    }));
    after(() => {
        server.close();
    });
});
