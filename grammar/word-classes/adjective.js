import * as features from '../features'

export function parse(tag) {
  return {
    degree: features.degree(tag),
    gender: features.gender(tag),
    grammarCase: features.grammarCase(tag),
    number: features.number(tag),
  }
}

export function toString(tags) {
  const { degree, gender, grammarCase, number } = tags
  return `${degree}-${gender}-${grammarCase}${number}`
}
