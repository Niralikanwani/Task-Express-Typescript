import { NextFunction } from "express";

export const get404 = async (req: any, res: any, next: any) => {
  try {
    res.status(404).render('404', {
      pageTitle: 'Page Not Found',
      path: '/404',
      isAuthenticated: req.session.isLoggedIn
    });
  } catch (error) {
    console.log(error);
  }
};
