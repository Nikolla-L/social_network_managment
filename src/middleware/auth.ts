import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

export const checkAuth = asyncHandler(async (req: any, res: any, next: NextFunction) => {
    let headerToken = req.headers.authorization?.split(" ")[1];

    if (!headerToken || !req.headers.authorization) {
        return res.status(401).send('You are not authorized!');
    }

    const verify = async () => {
        const payload = await jwt.verify(headerToken, 'secret');
    }

    await verify()
        .then(() => next())
        .catch(error =>  res.status(401).send('You are not authorized!'));
})