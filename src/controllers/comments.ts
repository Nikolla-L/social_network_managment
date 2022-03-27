import { Request, Response } from 'express';
import { Comment } from '../models/comment';
import asyncHandler from 'express-async-handler';
import { checkPostExists } from '../utils/checkPostAndUserExists';
import { reaction } from '../types/reaction';
import { getCurrentUserId } from '../utils/getCurrentUserId';

export const addComment = asyncHandler(async (req: any, res: Response) => {
    try {
        const { postId, text } = req.body as {
            postId: string,
            text: string
        };
        const userId: string = getCurrentUserId(req, res);
    
        if(await checkPostExists(postId)) {
            const comment = await Comment.create({
                userId, postId, text
            });
            if(comment) {
                res.status(201).json(comment);
            } else {
                res.status(400).send('Bad request');
            }
        } else {
            res.status(404).send('Post not found with this Id')
            return;
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

export const getComments = asyncHandler(async (req: Request, res: Response) => {
    const postId = req.query.postId;
    const comments = await Comment.find({postId: postId});
    if(comments) {
        res.status(200).json(comments);
    } else {
        res.status(500).send('Internal server error');
    }
});

export const editComment = asyncHandler(async (req: Request, res: Response) => {
    try {
        const comment = await Comment.findById(req.query.commentId);
        if(comment) {
            comment.text = req.body.text || comment.text;
            const updatedComment = await comment.save();
            res.status(201).json(updatedComment);
        } else {
            res.status(404).send('Comment was not found');
        }
    } catch (error) {
        res.status(404).send('Comment was not found');
    }
});

export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
    try {
        const comment = await Comment.findById(req.query.commentId);
        if(comment) {
            comment.remove();
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

export const reactOnComment = asyncHandler(async (req: any, res: Response) => {
    try {
        const reactionId = req.query.reactionId;
        const commentId = req.query.commentId;
        const userId = getCurrentUserId(req, res);
        if(![1, 2, 3, 4, 0].includes(Number(reactionId))) {
            res.status(400).send('invalid reaction id');
            return;
        }
        if(commentId && userId && reactionId) {
            const newReact: reaction = {
                userId: userId?.toString(),
                reactionId: reactionId?.toString()
            };
            let comment = await Comment.findById(commentId);
            if(comment) {
                let commentReacts = comment.reacts;
                let reactionIndex = commentReacts.findIndex(r => r.userId == userId);
                if(reactionIndex > -1) {
                    commentReacts[reactionIndex] = newReact;
                } else {
                    commentReacts.push(newReact);
                }
                comment.reacts = commentReacts;
                const updatedComment = await comment.save();
                res.status(201).send(updatedComment);
                return;
            } else {
                res.status(404).send('Comment not found');
                return;
            }
        } else {
            res.status(400).send('Bad request');
            return;
        }
    } catch (error) {
        res.status(400).send('Bad request');
        return;
    }
});

export const unreactOnComment = asyncHandler(async (req: any, res: Response) => {
    try {
        const userId = getCurrentUserId(req, res);
        const commentId = req.query.commentId;
        let comment = await Comment.findById(commentId);
        if(comment) {
            let commentReacts = comment.reacts;
            let reactionIndex = commentReacts.findIndex(r => r.userId == userId);
            if(reactionIndex > -1) {
                commentReacts.splice(reactionIndex, 1);
            }
            comment.reacts = commentReacts;
            const updatedComment = await comment.save();
            res.status(201).send(updatedComment);
            return;
        } else {
            res.status(404).send('Comment not found with this Id');
            return;
        }
    } catch (error) {
        res.status(400).send(error);
        return;
    }
});