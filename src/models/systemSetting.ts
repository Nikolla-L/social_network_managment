import { model, Schema } from 'mongoose';
import { SystemSettingDocument } from '../types/systemSetting';

const systemSettingSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            default: 'SNM'
        },
        logo: {
            type: String,
            required: false
        },
        primaryColor: {
            type: String,
            required: false,
            default: 'green'
        },
        secondaryColor: {
            type: String,
            required: false,
            default: 'indigo'
        }
    }
);

export const SystemSetting = model<SystemSettingDocument>('SustemSetting', systemSettingSchema);