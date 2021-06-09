"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const check_1 = require("express-validator/check");
const authController = require('../controllers/auth');
// import * as authController from '../controllers/auth';
const authRoutes = express_1.default.Router();
authRoutes.get('/login', authController.getLogin);
authRoutes.get('/signup', authController.getSignup);
authRoutes.post('/login', [
    check_1.body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.'),
    check_1.body('password', 'Password has to be valid.')
        .isLength({ max: 8 })
        .isAlphanumeric()
        .trim()
], authController.postLogin);
authRoutes.post('/signup', [
    check_1.check('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
    check_1.body('password', 'Please enter a password with only numbers and text and at max 8 characters.')
        .isLength({ max: 8 })
        .isAlphanumeric()
        .trim(),
    check_1.body('confirmPassword')
        .trim()
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords have to match!');
        }
        return true;
    })
], authController.postSignup);
authRoutes.post('/logout', authController.postLogout);
exports.default = authRoutes;
