// const path = require('path');
import path from 'path';

// const express = require('express');
import express from 'express';
// const bodyParser = require('body-parser');
import bodyParser from 'body-parser';
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// const session = require('express-session');
import session from 'express-session';
// const MongoDBStore = require('connect-mongodb-session')(session);
import MongoStore from 'connect-mongodb-session';
const MongoDBStore = MongoStore(session);
// const csrf = require('csurf');
// import csrf from 'csurf';
// const flash = require('connect-flash');
import flash from 'connect-flash';
// const multer = require('multer');

// const errorController = require('./controllers/error');
import * as errorController from './controllers/error';
// const User = require('./models/user');
import { User } from './models/user';

const MONGODB_URI =
  'mongodb+srv://root:NOvSqnV0lzmK3Fe5@cluster0.mbxze.mongodb.net/emp-dep-db';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
// const csrfProtection = csrf();


app.set('view engine', 'ejs');
app.set('views', './dist/views');

// const adminRoutes = require('./routes/admin');
import adminRoutes from './routes/admin';
// const homeRoutes = require('./routes/home');
import homeRoutes from './routes/home';
// const authRoutes = require('./routes/auth');
import authRoutes from './routes/auth';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
// app.use(csrfProtection);
app.use(flash());

app.use((req: any, res: any, next: any) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
    
});

app.use((req: any, res: any, next: any) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  // res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(homeRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI,{useNewUrlParser: true , useUnifiedTopology: true})
  .then(result => {
    console.log("Listening to localhost:4040");
    app.listen(4040);
  })
  .catch(err => {
    console.log(err);
  });