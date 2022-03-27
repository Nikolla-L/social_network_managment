import { Post } from '../models/post';
import { User } from '../models/user';

export const checkPostExists = async (postId: string) => {
    const post = await Post.findById(postId);
    if(post) {
        return true;
    } else {
        return false;
    }
}

export const checkUserExists = async (userId: string) => {
    const user = await User.findById(userId);
    if(user) {
        return true;
    } else {
        return false;
    }
}