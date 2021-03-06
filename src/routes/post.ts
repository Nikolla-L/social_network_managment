import { Router } from 'express';
import {
    addPost,
    getAllPosts,
    getUserPosts,
    getOnePost,
    editPost,
    reactOnPost,
    unreactOnPost,
    deletePost
} from '../controllers/posts';
import { checkAuth } from '../middleware/auth';
import { checkAuthAndUserSelfOrAdmin } from '../middleware/authAndIsAdminOrSelfUser';

const router: Router = Router();

 /** 
 * @swagger
 * components:
 *      schemas:
 *           AddPost:
 *              type: object,
 *              required:
 *                  - title
 *                  - description
 *              properties:
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
router.post('/', checkAuth, addPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: filter by user id
 *     security:
 *     - jwt: []
 *     responses:
 *       200:
 *          description: success
 *       500:
 *         description: Internal server error
*/
router.get('/', checkAuth, getAllPosts);

/**
 * @swagger
 * /api/posts/my-posts:
 *   get:
 *     summary: Get my (authorized user) posts
 *     tags: [Post]
 *     security: 
 *     - jwt: []
 *     responses:
 *       200:
 *          description: success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Not found
*/
router.get('/my-posts', checkAuth, getUserPosts);

/**
 * @swagger
 * /api/posts/one-post:
 *   get:
 *     summary: Get one post with postId
 *     tags: [Post]
 *     parameters:
 *       - in: query
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
 *       400:
 *          description: Bad request
 *       401:
 *          description: Unauthorized
 *       404:
 *          description: Not Found
 *       500:
 *         description: Internal server error
*/
router.get('/one-post', checkAuth, getOnePost);

/**
 * @swagger
 * /api/posts/edit:
 *   put:
 *     summary: Edit post
 *     tags: [Post]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: user id
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *           required: true
 *         description: post id
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
router.put('/edit', checkAuthAndUserSelfOrAdmin, editPost);

/**
 * @swagger
 * /api/posts/react:
 *   post:
 *     summary: React on post
 *     tags: [Post]
 *     description: Reaction IDs are like - 0, fun - 1, love - 2, angry - 3, sad - 4
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *           required: true
 *         description: post id
 *       - in: query
 *         name: reactionId
 *         schema:
 *           type: string
 *           required: true
 *         description: reaction id
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
router.post('/react', checkAuth, reactOnPost);
/**
 * @swagger
 * /api/posts/react:
 *   delete:
 *     summary: Remove reaction on post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *           required: true
 *         description: post id
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
router.delete('/react', checkAuth, unreactOnPost);

/**
 * @swagger
 * /api/posts:
 *   delete:
 *     summary: Delete post
 *     tags: [Post]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: user id
 *       - in: query
 *         name: postId
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
 *       403:
 *          description: Forbidden
 *       500:
 *         description: Internal server error
*/
router.delete('/', checkAuthAndUserSelfOrAdmin, deletePost);

export default router;