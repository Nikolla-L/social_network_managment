import { User } from '../models/user';

export const seedUser = async () => {
    let alreadySeeded = await User.findOne({email: 'admin@mail.com'});
    if(alreadySeeded) {
        console.log('default admin already seeded');
    } else {
        let result = User.create({
            username: 'Admin',
            email: 'admin@mail.com',
            password: 'admin123',
            genderId: 1,
            photo: null,
            birthDate: '2022-03-05T09:35:45.963+00:00',
            isAdmin: true
        });
        console.log(result, ' --- default admins seed done');
    }
};