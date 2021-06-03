import { NextFunction } from "express";

// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';

// const User = require('../models/user');
import { User } from '../models/user';

export const getLogin = (req: any, res: any, next: any) => {
  let message = req.flash('error') as String;
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

export const getSignup = (req: any, res: any, next: any) => {
  let message = req.flash('error') as String;
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

export const postLogin = (req: any, res: any, next: any) => {
  const email = req.body.email as HTMLInputElement;
  const password = req.body.password as string;
  User.findOne({ email: email })
    .then((user: any) => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch: boolean) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err: Error) => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch((err: Error) => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch((err: Error) => console.log(err));
};

export const postSignup = (req: any, res: any, next: any) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc: any) => {
      if (userDoc) {
        req.flash(
          'error',
          'E-Mail exists already, please pick a different one.'
        );
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword: String) => {
          const user = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword,
          });
          return user.save();
        })
        .then((result: any) => {
          res.redirect('/login');
        })
        .catch((err: Error) => {
          console.log(err);
        });
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

export const postLogout = (req: any, res: any, next: any) => {
  req.session.destroy((err: Error) => {
    console.log(err);
    res.redirect('/');
  });
};
