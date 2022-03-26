import { Model, Document } from "mongoose";

export interface User {
    username: string;
    email: string;
    phone: string;
    password: string;
    genderId: number;
    photo: string;
    birthDate: Date;
    isAdmin?: boolean;
    resetCode: string;
}

export interface UserDocument extends User, Document {
    matchPassword: (password: string) => Promise<Boolean>
}

export interface UserModel extends Model<UserDocument> {}