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
exports.postLogout = exports.postSignup = exports.postLogin = exports.getSignup = exports.getLogin = void 0;
// import { NextFunction } from "express";
const check_1 = require("express-validator/check");
// const bcrypt = require('bcryptjs');
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// const User = require('../models/user');
const user_1 = require("../models/user");
const getLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        res.render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: message
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getLogin = getLogin;
const getSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        res.render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage: message
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSignup = getSignup;
const postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: errors.array()[0].msg
        });
    }
    try {
        const user = yield user_1.User.findOne({ email: email });
        if (!user) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
        }
        const doMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
                console.log(err);
                res.redirect('/');
            });
        }
        req.flash('error', 'Invalid email or password.');
        res.redirect('/login');
    }
    catch (error) {
        console.log(error);
        res.redirect('/login');
    }
});
exports.postLogin = postLogin;
const postSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage: errors.array()[0].msg
        });
    }
    try {
        const userDoc = yield user_1.User.findOne({ email: email });
        if (userDoc) {
            req.flash('error', 'E-Mail exists already, please pick a different one.');
            return res.redirect('/signup');
        }
        else {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
            const user = yield new user_1.User({
                fullname: fullname,
                email: email,
                password: hashedPassword,
            });
            const newUser = yield user.save();
        }
        res.redirect('/login');
    }
    catch (error) {
        console.log(error);
    }
});
exports.postSignup = postSignup;
const postLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.destroy((err) => {
            console.log(err);
            res.redirect('/');
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.postLogout = postLogout;
