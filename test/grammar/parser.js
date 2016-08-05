import * as adjective from './word-classes/adjective'
import * as adverb from './word-classes/adverb'
import * as noun from './word-classes/noun'
import * as numeral from './word-classes/numeral'
import * as otherPronoun from './word-classes/other-pronoun'
import * as pronoun from './word-classes/pronoun'
import * as reflexivePronoun from './word-classes/reflexive-pronoun'
import * as verb from './word-classes/verb'

import test from 'ava'
import { parse, toString } from '../../grammar/parser'

[
  adjective,
  adverb,
  noun,
  numeral,
  otherPronoun,
  pronoun,
  reflexivePronoun,
  verb,
].forEach(type => {
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

test('it should throw for unknown word class', assert => {
  assert.throws(() => parse('unknown'))
  assert.throws(() => toString('unknown'))
})
