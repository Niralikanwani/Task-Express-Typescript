// const express = require('express');
import express from 'express';

const authController = require('../controllers/auth');
// import * as authController from '../controllers/auth';

const authRoutes = express.Router();

authRoutes.get('/login', authController.getLogin);

authRoutes.get('/signup', authController.getSignup);

authRoutes.post('/login', authController.postLogin);

authRoutes.post('/signup', authController.postSignup);

authRoutes.post('/logout', authController.postLogout);

export default authRoutes;