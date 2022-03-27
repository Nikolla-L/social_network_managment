import { model, Schema } from 'mongoose';
import { PostDocument } from '../types/post';

const postSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: false
        },
        backgroundColor: {
            type: String,
            required: false,
            default: 'white'
        },
        textColor: {
            type: String,
            required: false,
            default: 'black'
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

export const Post = model<PostDocument>('Post', postSchema);