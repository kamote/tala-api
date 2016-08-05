import * as features from '../features'

export function parse(tag) {
  return {
    grammarCase: features.grammarCase(tag),
    gender: features.gender(tag),
    number: features.number(tag),
  }
}

export function toString(tags) {
  const { gender, grammarCase, number } = tags
  return `${gender}_${grammarCase}${number}`
}
