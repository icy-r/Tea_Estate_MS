import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../../middleware/auth-mid.js'
import * as authCtrl from '../../controllers/authentication/auth-controller.js'

const router = Router()

/*---------- Public Routes ----------*/
router.post('/signup', authCtrl.signup)
router.post('/login', authCtrl.login)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/change-password', checkAuth, authCtrl.changePassword)

export { router }
