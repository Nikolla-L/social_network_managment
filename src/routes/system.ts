import { Router } from 'express';
import { getSystemSettings, editSystemSettings } from '../controllers/system';
import { checkAuthAndAdmin } from '../middleware/authAndIsAdmin';

const router: Router = Router();

/**
  * @swagger
  * tags:
  *   name: System Settings
  *   description: System settings APIs
*//**
* @swagger
* components:
*      schemas:
*           EditSystemSetting:
*              type: object,
*              properties:
*                  title:
*                      type: string
*                  logo:
*                      type: string
*                  primaryColor:
*                      type: string
*                  secondaryColor:
*                      type: string
*              example:
*                  title: new title
*                  logo: null
*                  primaryColor: yellow
*                  secondaryColor: red
*/

/**
 * @swagger
 * /api/system-settings:
 *   get:
 *     summary: Get system settings data
 *     tags: [System Settings]
 *     responses:
 *       200:
 *          description: success
 *       500:
 *         description: Internal server error
*/
router.get('/', getSystemSettings);

/**
 * @swagger
 * /api/system-settings:
 *   put:
 *     summary: Edit system settings
 *     tags: [System Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditSystemSetting'
 *     security: 
 *     - jwt: []
 *     responses:
 *       201:
 *          description: success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
*/
router.put('/', checkAuthAndAdmin, editSystemSettings);

export default router;