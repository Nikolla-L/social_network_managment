import { Request, Response } from 'express';
import { User } from '../models/user';
import { generateToken } from '../utils/generateToken';
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
            name: user.name,
            email: user.email,
            token: generateToken(user._id, 'secret')
        });
    } else {
        res.status(401).send('You are not authorized');
    }
});

export const register = asyncHandler(async (req: Request, res: Response) => {
    const {name, email, password} = req.body as {
        name: string;
        email: string;
        password: string;
    };

    const userExists = await User.findOne({ email });
    if(userExists) {
        res.status(400).send('User already exists with this email');
    }

    const user = await User.create({
        name, email, password
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            emial: user.email,
            token: generateToken(user._id, 'secret')
        })
    } else {
        res.status(400).send('Bad request');
    }
});

export const editUser = asyncHandler(async (req: any, res: Response) => {
    const user = await User.findById(req.user?._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
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

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if(user) {
        user.remove();
        res.status(204).send('Successfuly deleted!');
    } else {
        res.status(400).send('Bad request');
    }
});