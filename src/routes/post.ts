import { Router } from 'express';
import {
    addPost,
    getAllPosts,
    getOnePost,
    editPost,
    likePost,
    deletePost
} from '../controllers/posts';
import { checkAuth } from '../middleware/auth';
// import { checkAuthAndIsAdmin } from '../middleware/authAndIsAdmin';
import { checkAuthAndUserSelfOrAdmin } from '../middleware/authAndIsAdminOrSelfUser';

const router: Router = Router();

 /** 
 * @swagger
 * components:
 *      schemas:
 *           AddPost:
 *              type: object,
 *              required:
 *                  - userId
 *                  - title
 *                  - description
 *              properties:
 *                  userId:
 *                      type: string
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  photo:
 *                      type: string
 *                  backgroundColor:
 *                      type: string
 *                  textColor:
 *                      type: string
 *              example:
 *                  userId: ssdsdfdfdgdg3434
 *                  title: titlexample
 *                  description: some desc text
 *                  photo: skskks.jpg
 *                  backgroundColor: yellow
 *                  textColor: red
*//**
* @swagger
* components:
*      schemas:
*           EditPost:
*              type: object,
*              properties:
*                  title:
*                      type: string
*                  description:
*                      type: string
*                  photo:
*                      type: string
*                  backgroundColor:
*                      type: number
*                  textColor:
*                      type: string
*              example:
 *                  title: titlexample
 *                  description: some desc text
 *                  photo: skskks.jpg
 *                  backgroundColor: yellow
 *                  textColor: red
*//**
* @swagger
* components:
*      schemas:
*           LikePost:
*              type: object,
*              properties:
*                  userId:
*                      type: string
*                  postId:
*                      type: string
*              example:
 *                  userId: hgtryh4564hfgh
 *                  postId: rfgeetgthrhryh
*/
/**
  * @swagger
  * tags:
  *   name: Post
  *   description: Post actions APIs
*/

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Add new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddPost'
 *     security: 
 *     - jwt: []
 *     responses:
 *       200:
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
router.post('/', checkAuth, addPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     responses:
 *       200:
 *          description: success
 *       500:
 *         description: Internal server error
*/
router.get('/', checkAuth, getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get one post with postId
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: post id
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
router.get('/:id', checkAuth, getOnePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Edit post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditPost'
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
 *         description: Hidden action
 *       500:
 *         description: Internal server error
*/
router.put('/:id', checkAuthAndUserSelfOrAdmin, editPost);

/**
 * @swagger
 * /api/posts/like:
 *   put:
 *     summary: Like post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LikePost'
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
router.put('/like', checkAuth, likePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: post id
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
 *       500:
 *         description: Internal server error
*/
router.delete('/:id', checkAuthAndUserSelfOrAdmin, deletePost);

export default router;