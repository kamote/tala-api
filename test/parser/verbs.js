import assert from 'assert'
import { parse } from '../../grammar/parser'

const testCases = {
  'LHÞT-SB-KK-NFET': {
    number: 'ET',
    tense: 'ÞT',
    'past participal': 'LHÞT',
    article: 'gr',
    gender: 'KK',
  },
}

describe('Parse verbs', () => {
  const wordClass = 'so'

  Object.keys(testCases).forEach(input => {
    it(`should parse ${input}`, () => {
      let parsed = parse(wordClass, input)
      let expected = testCases[input]

      assert.deepEqual(parsed, expected)
      // assert.equal(toString(wordClass, parsed), input)
    })
  })
})
