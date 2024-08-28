import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../../middleware/auth-mid.js'
import * as profilesCtrl from '../../controllers/user-management/profiles-controller.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

export { router }
