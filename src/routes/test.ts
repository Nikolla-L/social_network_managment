import { Router, Request, Response } from 'express';
import { checkAuth } from '../middleware/auth';
import { checkAuthAndAdmin } from '../middleware/authAndIsAdmin';
import { sendExampleSms } from '../utils/smsSender';

const router: Router = Router();

 /**
  * @swagger
  * tags:
  *   name: Test
  *   description: Test apis for development process
*/

/** 
 * @swagger
 * components:
 *      schemas:
 *           SmsExample:
 *              type: object,
 *              required:
 *                  - number
 *                  - text
 *              properties:
 *                  number: string
 *                  text: string
 *              example:
 *                  number: 555555555
 *                  text: something
*/

/**
 * @swagger
 * /api/test/example-auth:
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
 * /api/test/example-auth-and-isAdmin:
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

/**
 * @swagger
 * /api/test/send-sms:
 *   post:
 *     summary: send example sms to phone number, protected with admin middleware
 *     tags: [Test]
 *     security: 
 *     - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SmsExample'
 *     responses:
 *       200:
 *          description: success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/send-sms', checkAuthAndAdmin, (req: Request, res: Response) => {
  try {
    const phoneNumber = req.body.number?.toString();
    const text = req.body.text?.toString();
    if(phoneNumber && text) {
      sendExampleSms(phoneNumber, text);
      res.status(200).send('Sms has been sent');
    } else {
      res.status(400).send('Bad request: phone number is needed');
    }
  } catch (error) {
    res.status(400).send('error');
    console.log(error)
  }
})

export default router;