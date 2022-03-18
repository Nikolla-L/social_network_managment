import { Router } from 'express';
import {
  login,
  register,
  editUser,
  getAllUsers,
  deleteUser
} from '../controllers/users';
import { checkAuth } from '../middleware/auth';

const router: Router = Router();

/** 
 * @swagger
 * components:
 *      schemas:
 *          LoginUser:
 *              type: object,
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      type: stirng
 *                  password:
 *                      type: stiring
 *              example:
 *                  email: example@mail.com
 *                  password: something123
 *//** 
 * @swagger
 * components:
 *      schemas:
 *           RegisterUser:
 *              type: object,
 *              required:
 *                  - name
 *                  - email
 *                  - password  
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *              example:
 *                  name: Nick
 *                  email: example@mail.com
 *                  password: something123
*//**
* @swagger
* components:
*      schemas:
*           EditUser:
*              type: object,
*              required:
*                  - _id
*              properties:
*                  _id:
*                      type: string
*                  name:
*                      type: string
*                  email:
*                      type: string
*                  password:
*                      type: string
*              example:
*                  _id: 1
*                  name: Nick
*                  email: example@mail.com
*                  password: something123
*/
 /**
  * @swagger
  * tags:
  *   name: User
  *   description: Users authorization and registration API (+ edit user)
*/

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: ავტორიზაცია
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *          description: success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
*/
router.post('/login', login);
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: რეგისტრაცია
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *          description: success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
*/
router.post('/register', register);
/**
 * @swagger
 * /api/edit:
 *   put:
 *     summary: იუზერის ედიტირება
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditUser'
 *     security: 
 *     - jwt: []
 *     responses:
 *       201:
 *          description: success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/
router.put('/edit', checkAuth, editUser);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: არსებული იუზერების სიის მიღება
 *     tags: [User]
 *     responses:
 *       200:
 *          description: success
 *       500:
 *         description: Internal server error
*/
router.get('/users', getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: იუზერის წაშლა
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: user id
 *     security: 
 *     - jwt: []
 *     responses:
 *       204:
 *          description: success
 *       400:
 *          description: bad request
 *       401:
 *          description: unauthorized
 *       500:
 *         description: Internal server error
*/
router.delete('/users/:id', checkAuth, deleteUser);

export default router;