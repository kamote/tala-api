import { Router } from 'express'

import index from './index/route'
import declensions from './declensions/route'
import cases from './cases/route'

const router = new Router()

router.use('/', index)
router.use('/', declensions)
router.use('/', cases)

export default router
