import { Router, Request, Response } from 'express';
import { checkAuth } from '../middleware/auth';
import { checkAuthAndAdmin } from '../middleware/authAndIsAdmin';

const router: Router = Router();

 /**
  * @swagger
  * tags:
  *   name: Test
  *   description: Test apis for development process
*/
/**
 * @swagger
 * /api/example-auth:
 *   get:
 *     summary: test api for auth middleware
 *     tags: [Test]
 *     security: 
 *     - jwt: []
 *     responses:
 *       200:
 *          description: success
 *       401:
 *         description: unauthorized
 *       500:
 *         description: Internal server error
*/
router.get('/example-auth', checkAuth, (req: Request, res: Response) => {
    res.send('Authorization is done. It means middleware works perfectly')
});
/**
 * @swagger
 * /api/example-auth-and-isAdmin:
 *   get:
 *     summary: test api for admin auth middleware
 *     tags: [Test]
 *     security: 
 *     - jwt: []
 *     responses:
 *       200:
 *          description: success
 *       400:
 *         description: Bad request
 *       401:
 *         description: unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal server error
*/
router.get('/example-auth-and-isAdmin', checkAuthAndAdmin, (req: Request, res: Response) => {
  res.send('Authorization and Admin verification is successfully done')
});

export default router;