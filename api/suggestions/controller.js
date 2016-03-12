import { getSuggestions } from './spelling'

export function suggestions(word) {
  return new Promise((resolve, reject) => {
    getSuggestions(word, (err, results) => {
      if (err) reject(err)
      resolve(results)
    })
  })
}
