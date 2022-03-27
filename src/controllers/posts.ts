import { Request, Response } from 'express';
import { Post } from '../models/post';
import { User } from '../models/user';
import asyncHandler from 'express-async-handler';
import { getCurrentUserId } from '../utils/getCurrentUserId';
import { reaction } from '../types/reaction';

export const addPost = asyncHandler(async (req: any, res: Response) => {
    try {
        const { title, description, photo, backgroundColor, textColor } = req.body as {
            title: string,
            description: string,
            photo: string,
            backgroundColor: string,
            textColor: string
        };

        const userId: string = getCurrentUserId(req, res);
        const user = await User.findById(userId);
        if(!user) {
            res.status(404).send("User doesn't exist with this id");
            return;
        }
    
        const post = await Post.create({
            userId, title, description, photo, backgroundColor, textColor
        });
    
        if(post) {
            res.status(201).json(post);
        } else {
            res.status(400).send('Bad request');
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.query.id;
    const posts = userId ? await Post.find({userId: userId}) : await Post.find();
    if(posts) {
        res.status(200).json(posts);
    } else {
        res.status(500).send('Internal server error');
    }
});

export const getUserPosts = asyncHandler(async (req: any, res: Response) => {
    try {
        const userId: string = getCurrentUserId(req, res);
        const posts = await Post.find({userId: userId});
        if(posts) {
            res.status(200).json(posts);
        } else {
            res.status(404).send('Not found');
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

export const getOnePost = asyncHandler(async (req: Request, res: Response) => {
    try {
        const id = req.query.id;
        if(!id) {
            res.status(400).send('Bad reuqest: id required');
            return;
        }

        const post = await Post.findById(id);
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        res.status(400).send('Bad request');
        return;
    }
});

export const editPost = asyncHandler(async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.query.postId);
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
    } catch (error) {
        res.status(404).send('Post was not found');
    }
});

export const reactOnPost = asyncHandler(async (req: Request, res: Response) => {
    try {
        const reactionId = req.query.reactionId;
        const postId = req.query.postId;
        const userId: string = getCurrentUserId(req, res);
        if(![1, 2, 3, 4, 0].includes(Number(reactionId))) {
            res.status(400).send('invalid reaction id');
            return;
        }
        if(userId && reactionId && userId) {
            const newReact: reaction = {
                userId: userId,
                reactionId: reactionId?.toString()
            };
            let post = await Post.findById(postId);
            if(post) {
                let postReacts = post.reacts;
                let reactionIndex = postReacts.findIndex(r => r.userId == userId);
                if(reactionIndex > -1) {
                    postReacts[reactionIndex] = newReact;
                } else {
                    postReacts.push(newReact);
                }
                post.reacts = postReacts;
                const updatedPost = await post.save();
                res.status(201).send(updatedPost);
                return;
            } else {
                res.status(404).send('Post not found with this Id');
                return;
            }
        } else {
            res.status(400).send('Bad request');
            return;
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

export const unreactOnPost =  asyncHandler(async (req: Request, res: Response) => {
    try {
        const userId: string = getCurrentUserId(req, res);
        const postId = req.query.postId;
        if(userId) {
            let post = await Post.findById(postId);
            if(post) {
                let postReacts = post.reacts;
                let reactionIndex = postReacts.findIndex(r => r.userId == userId);
                if(reactionIndex > -1) {
                    postReacts.splice(reactionIndex, 1);
                }
                post.reacts = postReacts;
                const updatedPost = await post.save();
                res.status(201).send(updatedPost);
                return;
            } else {
                res.status(404).send('Post not found with this Id')
                return;
            }
        } else {
            res.status(400).send('Bad request');
            return;
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.query.postId);

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