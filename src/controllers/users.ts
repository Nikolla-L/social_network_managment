import { Request, Response } from 'express';
import { User } from '../models/user';
import asyncHandler from 'express-async-handler';
import {
    sendRegistrationWelcome,
    sendDeleteAccountSuccess,
    sendCodeToEmail
} from '../utils/mailer';
import { sendCodeToPhone } from '../utils/smsSender';
import { generateToken } from '../utils/generateToken';
import { generateString } from '../utils/services';

export const login = asyncHandler(async (req: Request, res: Response) => {
    const {email, password} = req.body as {email: string, password: string};
    if(!email || !password) {
        res.status(400).send({success: false, error: 'Please provide email and passowrd'});
    }
    const user = await User.findOne({ email });
    if(!user) {
        res.status(404).send('User not found, incorrect email');
    }
    if(user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            photo: user.photo,
            token: generateToken(user._id, 'secret')
        });
    } else {
        res.status(401).send('You are not authorized');
    }
});

export const register = asyncHandler(async (req: Request, res: Response) => {
    try {
        const {username, email, phone, password, genderId, photo, birthDate} = req.body as {
            username: string;
            email: string;
            phone: string;
            password: string;
            genderId: number;
            photo: string;
            birthDate: Date;
        };
    
        const userExists = await User.findOne({ email });
        if(userExists) {
            res.status(400).send('User already exists with this email');
            return;
        }

        const phoneUsed = await User.findOne({ phone });
        if(phoneUsed) {
            res.status(400).send('Phone number is in use');
            return;
        }
    
        if(![1, 2, 3].includes(Number(genderId))) {
            res.status(400).send('Bad request: invalid gender Id')
            return;
        }
    
        const user = await User.create({
            username, email, phone, password, genderId, photo, birthDate
        });
    
        if(user) {
            sendRegistrationWelcome(email);
            res.status(201).json({
                message: 'success',
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    photo: user.photo,
                    genderId: user.genderId,
                    birthDate: user.birthDate,
                    token: generateToken(user._id, 'secret')
                }
            })
        } else {
            res.status(400).send('Bad request');
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

export const sendResetWithEmailRequest = asyncHandler(async (req: Request, res: Response) => {
    try {
        const code = generateString();
        const email = req.body.email;
        const user = await User.findOne({email});
        if(user) {
            await sendCodeToEmail(email, code);
            user.resetCode = code;
            const updated = await user.save();
            res.status(201).send('success');
        } else {
            res.status(404).send('User not found with this email');
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

export const sendResetWithPhoneRequest = asyncHandler(async (req: Request, res: Response) => {
    try {
        const code = generateString();
        const phone = req.body.phone;
        const user = await User.findOne({phone});
        if(user) {
            await sendCodeToPhone(phone, code);
            user.resetCode = code;
            const updated = await user.save();
            res.status(201).send('success');
        } else {
            res.status(404).send('User not found with this phone number');
        }
    } catch (error) {
        res.status(400).send(error);
    } 
})

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { email, phone, code, password, confirmPassword } = req.body;
        let user: any;
        if(email) {
            user = await User.findOne({email});
        } else if(phone) {
            user = await User.findOne({phone});
        } else {
            res.status(400).send('email or phone number is needed');
            return;
        }

        if(!user) {
            res.status(404).send('User not found');
            return;
        }

        if(!code) {
            res.status(400).send('Bad request: code is required');
        }
            
        if(code == user.resetCode) {
            if(!password) {
                res.status(203).send('continue');
                return;
            }
            if(password == confirmPassword) {
                user.resetCode = null;
                user.password = password;
                const updatedUser = await user.save();
                res.status(201).json({
                    message: 'success',
                    user: {
                         _id: updatedUser._id,
                        username: updatedUser.username,
                        email: updatedUser.email,
                        phone: updatedUser.phone,
                        photo: updatedUser.photo
                    }
                });
            } else {
                res.status(400).send('Password and confirm password must match');
            }
        } else {
            res.status(400).send('Bad request: invalid code');
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

export const editUser = asyncHandler(async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.query.userId);
        if(user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.birthDate = req.body.birthDate || user.birthDate;
            user.genderId = req.body.genderId || user.genderId;
            user.photo = req.body.photo || user.photo;

            if(req.body.password) {
                user.password = req.body.password;
            }

            const userExists = await User.findOne({ email: req.body.email });
            if(userExists && req.body.email !== userExists.email) {
                res.status(400).send('User already exists with this email');
                return;
            }

            if(req.body.phone) {
                const phoneUsed = await User.findOne({ phone: req.body.phone});
                if(phoneUsed && req.body.phone != phoneUsed.phone) {
                    res.status(400).send('This phone number is in use');
                    return;
                }
            }

            if(req.body.genderId && ![1, 2, 3].includes(Number(req.body.genderId))) {
                res.status(400).send('Bad request: invalid gender Id')
                return;
            }

            const updatedUser = await user.save();
            res.status(201).json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                phone: updatedUser.phone,
                gender: updatedUser.genderId,
                photo: updatedUser.photo,
                birthDate: updatedUser.birthDate,
            });
        } else {
            res.status(404).send('User was not found');
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find();
    if(users) {
        res.status(200).json(users);
    } else {
        res.status(500).send('Internal server error');
    }
});

export const getOneUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if(!id) {
            res.status(400).send('Bad reuqest: id required');
            return;
        }

        const user = await User.findById(id);
        if(!user) {
            res.status(404).send('User not found');
            return;
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(400).send('Bad request');
        return;
    }
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.query.id);

        if(user) {
            sendDeleteAccountSuccess(user?.email);
            user.remove();
            res.status(200).send('Successfuly deleted!');
            return;
        } else {
            res.status(404).send('user not found!');
            return;
        }
    } catch (error) {
        res.status(400).send('Bad request');
        return;
    }
});