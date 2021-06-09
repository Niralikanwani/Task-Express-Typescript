// import { NextFunction } from "express";
import { validationResult } from 'express-validator/check';
// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';

// const User = require('../models/user');
import { User } from '../models/user';

export const getLogin = async (req: any, res: any, next: any) => {
  try {
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

  } catch (error) {
    console.log(error);
  }
  
};

export const getSignup = async (req: any, res: any, next: any) => {
  try {
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

  } catch (error) {
    console.log(error);
  }
  
};

export const postLogin = async (req: any, res: any, next: any) => {

  const email = req.body.email as HTMLInputElement;
  const password = req.body.password as string;

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors.array());
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: errors.array()[0].msg
    });
  }

  try {

    const user = await User.findOne({ email: email }) as any;

    if (!user) {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/login');
    }

    const doMatch = await bcrypt.compare(password, user.password) as boolean;
    
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

  } catch (error) {
    console.log(error);
    res.redirect('/login');
  }
  
};

export const postSignup = async (req: any, res: any, next: any) => {

  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors.array());
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()[0].msg
    });
  }
  try {
    const userDoc = await User.findOne({ email: email }) as any;

    if (userDoc) {
      req.flash(
        'error',
        'E-Mail exists already, please pick a different one.'
      );
      return res.redirect('/signup');

    } else {

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await new User({
        fullname: fullname,
        email: email,
        password: hashedPassword,
      });

      const newUser = await user.save();

    }

    res.redirect('/login');

  } catch (error) {
    console.log(error);
  }
};

export const postLogout = async (req: any, res: any, next: any) => {
  try {
    req.session.destroy((err: Error) => {
      console.log(err);
      res.redirect('/');
    });
  } catch (error) {
    console.log(error);
  }
};
