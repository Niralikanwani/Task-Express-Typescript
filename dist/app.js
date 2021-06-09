"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const path = require('path');
const path_1 = __importDefault(require("path"));
// const express = require('express');
const express_1 = __importDefault(require("express"));
// const bodyParser = require('body-parser');
const body_parser_1 = __importDefault(require("body-parser"));
// const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
// const session = require('express-session');
const express_session_1 = __importDefault(require("express-session"));
// const MongoDBStore = require('connect-mongodb-session')(session);
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const MongoDBStore = connect_mongodb_session_1.default(express_session_1.default);
// const csrf = require('csurf');
// import csrf from 'csurf';
// const flash = require('connect-flash');
const connect_flash_1 = __importDefault(require("connect-flash"));
// const multer = require('multer');
// const errorController = require('./controllers/error');
const errorController = __importStar(require("./controllers/error"));
// const User = require('./models/user');
const user_1 = require("./models/user");
const MONGODB_URI = 'mongodb+srv://root:NOvSqnV0lzmK3Fe5@cluster0.mbxze.mongodb.net/emp-dep-db';
const app = express_1.default();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
// const csrfProtection = csrf();
app.set('view engine', 'ejs');
app.set('views', './dist/views');
// const adminRoutes = require('./routes/admin');
const admin_1 = __importDefault(require("./routes/admin"));
// const homeRoutes = require('./routes/home');
const home_1 = __importDefault(require("./routes/home"));
// const authRoutes = require('./routes/auth');
const auth_1 = __importDefault(require("./routes/auth"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_session_1.default({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));
// app.use(csrfProtection);
app.use(connect_flash_1.default());
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    user_1.User.findById(req.session.user._id)
        .then(user => {
        req.user = user;
        next();
    })
        .catch(err => console.log(err));
});
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    // res.locals.csrfToken = req.csrfToken();
    next();
});
app.use('/admin', admin_1.default);
app.use(home_1.default);
app.use(auth_1.default);
app.use(errorController.get404);
mongoose_1.default
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
    console.log("Listening to localhost:4040");
    app.listen(4040);
})
    .catch(err => {
    console.log(err);
});
