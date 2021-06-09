// const express = require('express');
import express from 'express';
import { check, body } from 'express-validator/check';

const authController = require('../controllers/auth');
// import * as authController from '../controllers/auth';

const authRoutes = express.Router();

authRoutes.get('/login', authController.getLogin);

authRoutes.get('/signup', authController.getSignup);

authRoutes.post(
    '/login',
    [
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.'),
      body('password', 'Password has to be valid.')
        .isLength({ max: 8 })
        .isAlphanumeric()
        .trim()
    ],
    authController.postLogin
  );

authRoutes.post(
    '/signup',
    [
      check('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
      body(
        'password',
        'Please enter a password with only numbers and text and at max 8 characters.'
      )
        .isLength({ max: 8 })
        .isAlphanumeric()
        .trim(),
      body('confirmPassword')
        .trim()
        .custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Passwords have to match!');
          }
          return true;
        })
    ],
    authController.postSignup
  );

authRoutes.post('/logout', authController.postLogout);

export default authRoutes;