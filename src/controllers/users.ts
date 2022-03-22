import { Request, Response } from 'express';
import { User } from '../models/user';
import { generateToken } from '../utils/generateToken';
import { validateGenderId } from '../utils/userSettings';
import asyncHandler from 'express-async-handler';

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
    const {username, email, password, genderId, photo, birthDate} = req.body as {
        username: string;
        email: string;
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

    if(!validateGenderId(genderId)) {
        res.status(400).send('Bad request: invalid gender Id')
        return;
    }

    const user = await User.create({
        username, email, password, genderId, photo, birthDate
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            photo: user.photo,
            genderId: user.genderId,
            birthDate: user.birthDate,
            token: generateToken(user._id, 'secret')
        })
    } else {
        res.status(400).send('Bad request');
    }
});

export const editUser = asyncHandler(async (req: any, res: Response) => {
    const user = await User.findOne({email: req.body.email});

    if(user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.birthDate = req.body.birthDate || user.birthDate;
        user.genderId = req.body.gender || user.genderId;
        user.photo = req.body.photo || user.photo;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const userExists = await User.findOne({ email: req.body.email });
        if(userExists && req.body.email !== userExists.email) {
            res.status(400).send('User already exists with this email');
            return;
        }

        if(!validateGenderId(req.body.genderId) && req.body.genderId) {
            res.status(400).send('Bad request: invalid gender Id')
            return;
        }

        const updatedUser = await user.save();
        res.status(201).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            gender: updatedUser.genderId,
            photo: updatedUser.photo,
            birthDate: updatedUser.birthDate,
            token: generateToken(updatedUser._id, 'secret')
        });
    } else {
        res.status(404).send('User was not found');
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
            res.status(400).send('Bad reuqest');
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
        const user = await User.findById(req.params.id);

        if(user) {
            user.remove();
            res.status(200).send('Successfuly deleted!');
            return;
        }
        res.status(200).send('Successfuly deleted!');
        return;
    } catch (error) {
        res.status(400).send('Bad request');
        return;
    }
});