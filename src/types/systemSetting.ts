import { Model, Document } from 'mongoose';

export interface SystemSetting {
    title: string;
    logo: string;
    primaryColor: string;
    secondaryColor: string;
}

export interface SystemSettingDocument extends SystemSetting, Document {}

export interface SystemSettingModel extends Model<SystemSettingModel> {}