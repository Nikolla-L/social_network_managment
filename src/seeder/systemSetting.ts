import { SystemSetting } from "../models/systemSetting";

export const seedSystemSetting = async () => {
    let existingSetting = await SystemSetting.find();
    let alreadySeeded = Array.from(existingSetting)?.length > 0;
    if(alreadySeeded) {
        console.log('default system settings already seeded');
    } else {
        let setting = SystemSetting.create({
            title: 'SNM',
            logo: null
        });
        console.log(setting, ' --- systems default settings seed done');
    }
}