import { NextFunction } from "express";

export const getIndex = async (req: any, res: any, next: any) => {
  try {
    let message = req.flash('error') as string;
    
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }

    res.render('home/index', {
      pageTitle: 'Home',
      path: '/',
      errorMessage: message
    });

  } catch (error) {
    console.log(error);
  } 
};