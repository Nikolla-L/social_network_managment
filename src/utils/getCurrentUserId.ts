import jwt from 'jsonwebtoken';
import { Response } from "express";

export const getCurrentUserId = (request: any, response: Response) => {
    let headerToken = request.headers.authorization?.split(" ")[1];
    if (!headerToken || !request.headers.authorization) {
        response.status(401).send('You are not authorized!');
        return;
    }
    const payload: any = jwt.verify(headerToken, 'secret');
    return payload?.id;
}