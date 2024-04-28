import Router from 'express'
import {registration, login, changeUser, getUserNameById} from '../controllers/userController'
import authMiddleware from "../middleware/authMiddleware"

const router = Router()

/**
 * @openapi
 * tags:
 *  name: User
 *  description: The user managing API
 */

/**
 * @openapi
 * /user/registration:
 *   post:
 *     tags: [User]
 *     description: Registration user
 *     consumes:
 *          - json
 *     parameters:
 *          - in: string
 *            name: login
 *            type: sting
 *            description: user login
 *          - in: string
 *            name: password
 *            type: sting
 *            description: user password
 *     responses:
 *       200:
 *         description: user in registration
 */
router.post('/registration', registration)

/**
 * @openapi
 * /user/login:
 *   post:
 *     tags: [User]
 *     description: Login user
 *     consumes:
 *          - json
 *     parameters:
 *          - in: string
 *            name: login
 *            type: sting
 *            description: user login
 *          - in: string
 *            name: password
 *            type: sting
 *            description: user password
 *     responses:
 *       200:
 *         description: user in login
 */
router.post('/login', login)

router.post('/change', authMiddleware, changeUser)

/**
 * @openapi
 * /user/getUserNameById/{userId}:
 *   get:
 *     tags: [User]
 *     description: Get user name by id
 *     responses:
 *       200:
 *         description: userName
 */
router.get('/getUserNameById/:id', getUserNameById)

export default router