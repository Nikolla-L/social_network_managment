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
 *                  - username
 *                  - email
 *                  - password  
 *                  - genderId
 *                  - birthDate
 *              properties:
 *                  username:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  genderId:
 *                      type: number
 *                  photo:
 *                      type: string
 *                  birthDate:
 *                      type: date
 *              example:
 *                  username: Nick
 *                  email: example@mail.com
 *                  password: something123
 *                  genderId: 1
 *                  photo: null
 *                  birthDate: 2022-03-05T09:35:45.963+00:00
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
*                  username:
*                      type: string
*                  email:
*                      type: string
*                  password:
*                      type: string
*                  genderId:
*                      type: number
*                  photo:
*                      type: string
*                  birthDate:
*                      type: date
*              example:
*                  _id: 1
*                  username: Nick
*                  email: example@mail.com
*                  password: something123
*                  genderId: 2
*                  photo: hwiufhwie7fgwe78rtyfy38f73874rfg9f
*                  birthDate: 2022-03-05T09:35:45.963+00:00
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
 *       description: "Gender Ids: male - 1, female - 2, other - 3"
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
 *       description: "Gender Ids: male - 1, female - 2, other - 3"
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
 *       200:
 *          description: success
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