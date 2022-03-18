import { User } from '../models/user';

export const seedUser = async () => {
    let alreadySeeded = await User.findOne({email: 'admin@mail.com'});
    if(alreadySeeded) {
        console.log('default admin already seeded');
    } else {
        let result = User.create({
            name: 'Admin',
            email: 'admin@mail.com',
            password: 'admin123'
        });
        console.log(result, ' - default admin seed done');
    }
};