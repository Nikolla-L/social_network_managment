import { Model, Document } from 'mongoose';

export interface Post {
    userId: string;
    title: string;
    description: string;
    photo: string;
    backgroundColor: string;
    textColor: string;
    likeIds: Array<string>;
}

export interface PostDocument extends Post, Document {}

export interface PostModel extends Model<PostModel> {}