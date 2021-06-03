// const path = require('path');
import path from 'path';

// const express = require('express');
import express from 'express';

const homeController = require('../controllers/home');
// const isAuth = require('../middleware/is-auth');

const homeRoutes = express.Router();

homeRoutes.get('/', homeController.getIndex);


export default homeRoutes;
