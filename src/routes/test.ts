import { Router, Request, Response } from 'express';
import { checkAuth } from '../middleware/auth';

const router: Router = Router();

 /**
  * @swagger
  * tags:
  *   name: Test
  *   description: Test apis for development process
*/
/**
 * @swagger
 * /api/example:
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
*/
router.get('/example', checkAuth, (req: Request, res: Response) => {
    res.send('Authorization is done. It means middleware works perfectly')
});

export default router;