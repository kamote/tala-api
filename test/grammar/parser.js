import * as noun from './word-classes/noun'
import * as adjective from './word-classes/adjective'
import * as numeral from './word-classes/numeral'
import * as verb from './word-classes/verb'
import * as adverb from './word-classes/adverb'
import * as pronoun from './word-classes/pronoun'
import * as otherPronoun from './word-classes/other-pronoun'

import test from 'ava'
import { parse, toString } from '../../grammar/parser'

[noun, numeral, adjective, verb, adverb, pronoun, otherPronoun].forEach(type => {
  const { wordClass, grammarTags } = type

  grammarTags.forEach(tag => {
    test(`${wordClass} - ${tag}`, assert => {
      const parsed = parse(wordClass, tag)
      const expected = toString(wordClass, parsed)

      if (tag.endsWith('2')) {
        assert.deepEqual(tag, `${expected}2`)
      } else {
        assert.deepEqual(tag, expected)
      }
    })
  })
})
