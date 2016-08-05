import * as adjective from './word-classes/adjective'
import * as adverb from './word-classes/adverb'
import * as noun from './word-classes/noun'
import * as numeral from './word-classes/numeral'
import * as otherPronoun from './word-classes/other-pronoun'
import * as pronoun from './word-classes/pronoun'
import * as reflexivePronoun from './word-classes/reflexive-pronoun'
import * as verb from './word-classes/verb'

export function parse(wordClass, grammarTag) {
  switch (wordClass) {
    case 'hk':
    case 'kk':
    case 'kvk':
      return noun.parse(grammarTag)
    case 'to':
      return numeral.parse(grammarTag)
    case 'lo':
      return adjective.parse(grammarTag)
    case 'ao':
      return adverb.parse(grammarTag)
    case 'fn':
      return otherPronoun.parse(grammarTag)
    case 'pfn':
      return pronoun.parse(grammarTag)
    case 'so':
      return verb.parse(grammarTag)
    case 'abfn':
      return reflexivePronoun.parse(grammarTag)
    default:
      throw new Error(`Unsupported word class: ${wordClass}`)
  }
}

export function toString(wordClass, tags) {
  switch (wordClass) {
    case 'hk':
    case 'kk':
    case 'kvk':
      return noun.toString(tags)
    case 'to':
      return numeral.toString(tags)
    case 'lo':
      return adjective.toString(tags)
    case 'ao':
      return adverb.toString(tags)
    case 'fn':
      return otherPronoun.toString(tags)
    case 'pfn':
      return pronoun.toString(tags)
    case 'so':
      return verb.toString(tags)
    case 'abfn':
      return reflexivePronoun.toString(tags)
    default:
      throw new Error(`Unsupported word class: ${wordClass}`)
  }
}
