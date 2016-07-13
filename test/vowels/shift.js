import assert from 'assert'

const vowels = ['a', 'ó', 'ý', 'ö']

function isVowel(letter) {
  return vowels.includes(letter)
}

function vowelShift(base, form) {
  const from = base.split('').filter(isVowel)[0]
  const to = form.split('').filter(isVowel)[0]

  return { from, to }
}

const testCases = [
  { base: 'tala', form: 'tölum', from: 'a', to: 'ö' },
  { base: 'bjóða', form: 'býð', from: 'ó', to: 'ý' },
  { base: 'bjóða', form: 'bauð', from: 'ó', to: 'au' },
]

describe('detects vowel shifts', () => {
  testCases.forEach(testCase => {
    it(`${testCase.base} -> ${testCase.form}`, () => {
      let { base, form, from, to } = testCase

      assert.deepEqual(vowelShift(base, form), { from, to })
    })
  })
})
