import * as features from '../features'

export function parse(tag) {
  return {
    degree: features.degree(tag),
  }
}

export function toString(tags) {
  const { degree } = tags
  return `ao_${degree}`
}
