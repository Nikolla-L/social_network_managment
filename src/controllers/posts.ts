import { Request, Response } from 'express';
import { Post } from '../models/post';
import asyncHandler from 'express-async-handler';

export const addPost = asyncHandler(async (req: Request, res: Response) => {
    const { userId, title, description, photo, backgroundColor, textColor } = req.body as {
        userId: any,
        title: string,
        description: string,
        photo: string,
        backgroundColor: string,
        textColor: string
    };

    const post = await Post.create({
        userId, title, description, photo, backgroundColor, textColor
    });

    if(post) {
        res.status(201).json(post);
    } else {
        res.status(400).send('Bad request');
    }
});

export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
    const posts = await Post.find();
    if(posts) {
        res.status(200).json(posts);
    } else {
        res.status(500).send('Internal server error');
    }
});

export const getOnePost = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if(!id) {
            res.status(400).send('Bad reuqest');
            return;
        }

        const post = await Post.findById(id);
        if(post) {
            res.status(404).send('Post not found');
            return;
        } else {
            res.status(200).json(post);
        }
    } catch (error) {
        res.status(400).send('Bad request');
        return;
    }
});

export const editPost = asyncHandler(async (req: Request, res: Response) => {
    const post = await Post.findById(req.body.id);
    if(post) {
        post.title = req.body.title || post.title;
        post.description = req.body.description || post.description;
        post.photo = req.body.photo || post.photo;
        post.backgroundColor = req.body.backgroundColor || post.backgroundColor;
        post.textColor = req.body.textColor || post.textColor;

        const updatedPost = await post.save();
        res.status(201).json(updatedPost);
    } else {
        res.status(404).send('Post was not found');
    }
});

export const likePost = asyncHandler(async (req: Request, res: Response) => {
    const { userId, postId } = req.body;

    if(userId) {
        const post = await Post.findById(postId);
        if(post) {
            post.likeIds = [...post.likeIds, userId]
            const updatedPost = await post.save();
            res.status(201).send(updatedPost);
        } else {
            res.status(404).send('Post not found with this Id')
        }
    } else {
        res.status(400).send('Bad request');
        return;
    }
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);

        if(post) {
            post.remove();
            res.status(200).send('Successfuly deleted!');
            return;
        } else {
            res.status(200).send('Successfuly deleted!');
            return;
        }
    } catch (error) {
        res.status(400).send('Bad request');
        return;
    }
});