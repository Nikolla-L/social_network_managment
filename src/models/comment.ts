import { model, Schema } from 'mongoose';
import { CommentDocument } from '../types/comment';

const commentSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        postId: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        reacts: {
            type: Array,
            required: false,
            default: []
        }
    },
    {
        timestamps: true
    }
);

export const Comment = model<CommentDocument>('Comment', commentSchema);