import { Router } from 'express'
import { find, findById } from './controller'
import format from '../middleware/format'

const router = new Router()

router.get('/find/:word', (req, res, next) => {
  find(req.params.word)
    .then(results => format(results, req.query.lang))
    .then(results => res.json(results))
    .catch(next)
})

router.get('/id/:id', (req, res, next) => {
  findById(req.params.id)
    .then(results => format(results, req.query.lang))
    .then(results => res.json(results))
    .catch(next)
})

export default router
