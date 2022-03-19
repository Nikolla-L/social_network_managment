import { NextFunction, Request, Response } from "express";
import { User } from '../models/user';
import asyncHandler from 'express-async-handler';

// middleware function to detect if the user is admin
export const isAdmin = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const email = req.body.email;
    let user: any;

    if(id) {
        user = await User.findById(id);
    } else if(email) {
        user = await User.findOne({email});
    } else {
        res.status(400).send('Bad request');
        return;
    }

    if(user.isAdmin) {
        next();
    } else {
        res.status(403).send('Unable this action');
        return;
    }
})