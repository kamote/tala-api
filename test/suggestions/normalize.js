import assert from 'assert'

const replacements = {
  á: 'a',
  f: 'v',
  æ: 'ae',
}

function normalize(str) {
  return Object.keys(replacements).reduce((curr, key) =>
    curr.replace(key, replacements[key]), str)
}

class Corrections {
  constructor() {
    this.map = new Map()
  }

  add(word) {
    const normalized = normalize(word)
    const corrections = this.map.get(normalized) || []
    this.map.set(normalized, [...corrections, word])
  }

  correct(word) {
    return this.map.get(normalize(word))
  }
}

describe('Normalize words', () => {
  it('Should replace a single occurance of a single letter', () => {
    assert.deepEqual(normalize('ár'), 'ar')
  })

  it('Should replace a multiple occurances of a single letter', () => {
    assert.deepEqual(normalize('álfur'), 'alvur')
  })
})

describe('Corrections', () => {
  it('Should suggest corrections for single letters', () => {
    const corrections = new Corrections()
    corrections.add('álfur')

    // One letter wrong
    assert.deepEqual(corrections.correct('alfur'), ['álfur'])
    assert.deepEqual(corrections.correct('álvur'), ['álfur'])

    // Two letters wrong
    assert.deepEqual(corrections.correct('alvur'), ['álfur'])
  })

  it('Should suggest corrections for double letters', () => {
    const corrections = new Corrections()
    corrections.add('frábært')

    // One letter wrong
    assert.deepEqual(corrections.correct('frabært'), ['frábært'])
    assert.deepEqual(corrections.correct('frábaert'), ['frábært'])

    // Two letters wrong
    assert.deepEqual(corrections.correct('frabaert'), ['frábært'])
  })
})
