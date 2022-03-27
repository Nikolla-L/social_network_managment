import { Router } from 'express';
import {
    addComment,
    editComment,
    deleteComment,
    getComments,
    reactOnComment,
    unreactOnComment
} from '../controllers/comments';
import { checkAuthAndUserSelfOrAdmin } from '../middleware/authAndIsAdminOrSelfUser';
import { checkAuth } from '../middleware/auth';

const router: Router = Router();

/**
  * @swagger
  * tags:
  *   name: Comment
  *   description: Posts Comments
*//** 
 * @swagger
 * components:
 *      schemas:
 *           AddComment:
 *              type: object,
 *              required:
 *                  - postId
 *                  - text
 *              properties:
 *                  postId:
 *                      type: string
 *                  text:
 *                      type: string
 *              example:
 *                  postId: gnfui3g34uy4giyfghi
 *                  text: example comment text
*//** 
 * @swagger
 * components:
 *      schemas:
 *           EditComment:
 *              type: object
 *              properties:
 *                  text:
 *                      type: string
 *              example:
 *                  text: example comment text
*/

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Add new comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddComment'
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
 router.post('/', checkAuth, addComment);

 /**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all comments of single post
 *     tags: [Comment]
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         description: post id
 *     security:
 *     - jwt: []
 *     responses:
 *       200:
 *          description: success
 *       500:
 *         description: Internal server error
*/
router.get('/', checkAuth, getComments);

/**
 * @swagger
 * /api/comments/edit:
 *   put:
 *     summary: Edit comment
 *     tags: [Comment]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: user id
 *       - in: query
 *         name: commentId
 *         schema:
 *           type: string
 *           required: true
 *         description: comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditComment'
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
router.put('/edit', checkAuthAndUserSelfOrAdmin, editComment);

/**
 * @swagger
 * /api/comments/react:
 *   post:
 *     summary: React on comment
 *     tags: [Comment]
 *     description: Reaction IDs are like - 0, fun - 1, love - 2, angry - 3, sad - 4
 *     parameters:
 *       - in: query
 *         name: commentId
 *         schema:
 *           type: string
 *           required: true
 *         description: comment id
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
router.post('/react', checkAuth, reactOnComment);

/**
 * @swagger
 * /api/comments/react:
 *   delete:
 *     summary: Remove reaction on comment
 *     tags: [Comment]
 *     parameters:
 *       - in: query
 *         name: commentId
 *         schema:
 *           type: string
 *           required: true
 *         description: comment id
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
router.delete('/react', checkAuth, unreactOnComment);

/**
 * @swagger
 * /api/comments:
 *   delete:
 *     summary: Delete comment
 *     tags: [Comment]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *         description: user id
 *       - in: query
 *         name: commentId
 *         schema:
 *           type: string
 *           required: true
 *         description: comment id
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
router.delete('/', checkAuthAndUserSelfOrAdmin, deleteComment);

export default router;