import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import { UserDocument } from '../types/user';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function(this: UserDocument, next) {
    if(!this.isModified('password')) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function(this: any, enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
}

export const User = model<UserDocument>("User", userSchema);