"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5252;
const { resolve } = require("path");
require("dotenv").config({ path: "../.env" });
// 
app.use(cors());
app.use(express.json());
app.get("/", ({ req, res }) => {
    const path = resolve(process.env.STATIC_DIR + "/index.html");
    res.sendFile(path);
});
app.get("/api/config", ({ req, res }) => {
    console.log('sending token'); // **this statement prints in console**
    const stripeSuffix = process.env.STRIPE_MODE || '';
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY + stripeSuffix,
    });
    console.log('sent token'); // **this statement does not print in console**
});
//////
/////////// Get Content //////////
//////
const contentPathsRoute = require('./routes/content/contentPaths.route');
app.use(contentPathsRoute);
const fetchContentRoute = require('./routes/content/fetchContent.route');
app.use(fetchContentRoute);
//////
/////////// Update Content //////////
//////
const saveDataRoute = require('./routes/content/saveData.route');
app.use(saveDataRoute);
const deleteDataRoute = require('./routes/content/deleteData.route');
app.use(deleteDataRoute);
//////
/////////// Upload Routes //////////
//////
const uploadImageRoute = require('./routes/uploads/uploadImage.route');
app.use(uploadImageRoute);
const uploadsRoute = require('./routes/uploads/uploads.route');
app.use(uploadsRoute);
//////
/////////// Webpage Routes //////////
//////
const pagesRoute = require('./routes/webpages/pages.route');
app.use(pagesRoute);
//////
/////////// User Routes //////////
//////
const loginRoute = require('./routes/auth/login.route');
app.use(loginRoute);
const signUpRoute = require('./routes/auth/signUp.route');
app.use(signUpRoute);
const server = app.listen(port, () => {
    console.log(`Server listening at http://${process.env.SERVER_HOST}:${port}`);
});
module.exports = server;
