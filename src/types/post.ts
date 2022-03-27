import { Model, Document } from 'mongoose';
import { reaction } from './reaction';

export interface Post {
    userId: string;
    title: string;
    description: string;
    photo: string;
    backgroundColor: string;
    textColor: string;
    reacts: Array<reaction>;
}

export interface PostDocument extends Post, Document {}

export interface PostModel extends Model<PostModel> {}