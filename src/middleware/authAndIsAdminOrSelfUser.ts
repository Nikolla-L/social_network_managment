import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import asyncHandler from 'express-async-handler';

// middleware function to authenicate and check if the user is admin or himself for individual profile actions
export const checkAuthAndUserSelfOrAdmin = asyncHandler(async(req: any, res: Response, next: NextFunction) => {
    let headerToken = req.headers.authorization?.split(" ")[1];

    if (!headerToken || !req.headers.authorization) {
        res.status(401).send('You are not authorized!');
        return;
    }

    const verify = async () => {
        const payload: any = await jwt.verify(headerToken, 'secret');
        const id = payload?.id;
        if(id) {
            const user: any = await User.findById(id);
            if(!user?.isAdmin) {
                res.status(403).send('Forbidden content');
                return;
            }
        } else {
            res.status(404).send('User not found');
            return;
        }
    }

    await verify()
        .then(() => next())
        .catch(error =>  console.log(error))
})