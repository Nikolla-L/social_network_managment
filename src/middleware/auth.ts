import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

export const checkAuth = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    let headerToken = req.headers.authorization?.split(" ")[1];

    if (!headerToken || !req.headers.authorization) {
        res.status(401).send('You are not authorized!');
        return;
    }

    const verify = async () => {
        const payload = await jwt.verify(headerToken, 'secret');
    }

    await verify()
        .then(() => next())
        .catch(error =>  res.status(401).send('You are not authorized!'));
})