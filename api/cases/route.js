import { Router } from 'express'
import verbs from './controller'

let router = new Router()

router.get('/cases/:word', (req, res) => {
  const word = req.params.word
  const result = verbs[word]

  return result ? res.json(result) : res.sendStatus(404)
})

export default router
