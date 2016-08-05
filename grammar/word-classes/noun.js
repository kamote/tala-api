import * as features from '../features'

export function parse(tag) {
  return {
    grammarCase: features.grammarCase(tag),
    number: features.number(tag),
    article: features.article(tag),
  }
}

export function toString(tags) {
  const { grammarCase, number, article } = tags
  return `${grammarCase}${number}${article}`
}
