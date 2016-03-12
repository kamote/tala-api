import { Router } from 'express'

import index from './index/route'
import declensions from './declensions/route'
import suggestions from './suggestions/route'

const router = new Router()

router.use('/', index)
router.use('/', declensions)
router.use('/', suggestions)

export default router
