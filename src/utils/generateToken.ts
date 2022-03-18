import jwt from 'jsonwebtoken';

export const generateToken = (id: string, secret: string) => {
    if(secret != null) {
        return jwt.sign({id}, secret, {expiresIn: '30m'});
    }
}