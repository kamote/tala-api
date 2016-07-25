import readline from 'readline'
import fs from 'fs'

const commentRegex = /#.*/g
const verbs = {}

const rl = readline.createInterface({
  input: fs.createReadStream('./api/cases/verbs.conf'),
})

rl.on('line', (line) => {
  const trimmed = line.replace(commentRegex, '').trim()
  if (trimmed) {
    const [verb, ...cases] = trimmed.split(/\s+/).filter(x => x)

    verbs[verb] = verbs[verb] || {}
    verbs[verb][cases.length] = verbs[verb][cases.length] || cases.join(' ')
  }
})

rl.on('close', () => {
  console.log('Cases done') // eslint-disable-line no-console
})

export default verbs
