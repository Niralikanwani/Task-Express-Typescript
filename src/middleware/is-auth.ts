import { NextFunction } from 'express';

export default (req: any, res: any, next: any) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}