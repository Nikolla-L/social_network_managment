import { Request, Response } from 'express';
import { SystemSetting } from '../models/systemSetting';
import asyncHandler from 'express-async-handler';

export const getSystemSettings = asyncHandler(async (req: Request, res: Response) => {
    const settings = await SystemSetting.find();
    if(settings) {
        res.status(200).send(settings);
    } else {
        res.status(500).send('Internal server error');
    }
});

export const editSystemSettings = asyncHandler(async (req: Request, res: Response) => {
    try {
        const systemData = await SystemSetting.find();
        const system = systemData[0];
        if(system) {
            system.title = req.body.title || system.title;
            system.logo = req.body.logo || system.logo;
            system.primaryColor = req.body.primaryColor || system.primaryColor;
            system.secondaryColor = req.body.secondaryColor || system.secondaryColor;
            const updatedSystem = await system.save();
            res.status(201).json(updatedSystem);
        } else {
            res.status(400).send('error')
        }
    } catch (error) {
        res.status(404).send(error);
    }
});