import { Model, Document } from 'mongoose';
import { reaction } from './reaction'

export interface Comment {
    userId: string;
    postId: string;
    text: string;
    reacts: Array<reaction>;
}

export interface CommentDocument extends Comment, Document {}

export interface CommentModel extends Model<CommentModel> {}