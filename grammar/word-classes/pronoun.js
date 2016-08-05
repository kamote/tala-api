import * as features from '../features'

export function parse(tag) {
  return {
    grammarCase: features.grammarCase(tag),
    number: features.number(tag),
  }
}

export function toString(tags) {
  const { grammarCase, number } = tags
  return grammarCase + number
}
