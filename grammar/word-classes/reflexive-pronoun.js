import * as features from '../features'

export function parse(tag) {
  return {
    grammarCase: features.grammarCase(tag),
  }
}

export function toString(tags) {
  const { grammarCase } = tags
  return grammarCase
}
