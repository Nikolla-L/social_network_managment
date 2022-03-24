import { Router } from 'express';
import {
  login,
  register,
  editUser,
  getAllUsers,
  getOneUser,
  deleteUser
} from '../controllers/users';
import { checkAuth } from '../middleware/auth';
import { checkAuthAndUserSelfOrAdmin } from '../middleware/authAndIsAdminOrSelfUser';

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
  *   description: Get, edit and delete users
*/
 /**
  * @swagger
  * tags:
  *   name: Auth
  *   description: Authorization and registration
*/

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authorization
 *     tags: [Auth]
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
 *     summary: Registration
 *     tags: [Auth]
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

// TODO
/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Edit user
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: currently authorized users id
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *         description: to edit users id
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
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
*/
router.put('/users', checkAuthAndUserSelfOrAdmin, editUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users list
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
 *   get:
 *     summary: Get the user with UserId
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: user id
 *     responses:
 *       200:
 *          description: Success
 *       400:
 *          description: Bad request
 *       401:
 *          description: Unauthorized
 *       404:
 *          description: Not Found
 *       500:
 *         description: Internal server error
*/
router.get('/users/:id', getOneUser);

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: user id to delete
 *     security: 
 *     - jwt: []
 *     responses:
 *       200:
 *          description: Success
 *       204:
 *          description: Success
 *       400:
 *          description: Bad request
 *       401:
 *          description: Unauthorized
 *       404:
 *          description: Not found
 *       500:
 *         description: Internal server error
*/
router.delete('/users', checkAuthAndUserSelfOrAdmin, deleteUser);

export default router;