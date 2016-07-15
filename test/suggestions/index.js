import assert from 'assert'
import levenshteinDistance from 'leven'
import LineByLineReader from 'line-by-line'

class Node {
  constructor(word) {
    this.children = {}
    this.word = word.toLowerCase()
  }

  keys() {
    return Object.keys(this.children)
  }

  get(key) {
    return this.children[key]
  }

  containsKey(key) {
    return this.children[key] !== undefined
  }

  addChild(key, word) {
    this.children[key] = new Node(word)
  }
}

class BKTree {
  root_ = null;

  add(word) {
    if (this.root_ === null) {
      this.root_ = new Node(word)
      return
    }

    let currentNode = this.root_
    let dist = levenshteinDistance(currentNode.word, word)

    while (currentNode.containsKey(dist)) {
      if (dist === 0) return

      currentNode = currentNode.get(dist)
      dist = levenshteinDistance(currentNode.word, word)
    }

    currentNode.addChild(dist, word)
  }

  search(word, d = 1) {
    const rtn = []
    this.recursiveSearch(this.root_, rtn, word.toLowerCase(), d)

    return rtn
  }

  recursiveSearch(node, rtn, word, d) {
    const currentDistance = levenshteinDistance(node.word, word)
    const minDistance = currentDistance - d
    const maxDistance = currentDistance + d

    if (currentDistance <= d) {
      rtn.push(node.word)
    }

    Array.from(node.keys()).filter(k => minDistance <= k && k <= maxDistance).forEach(key => {
      this.recursiveSearch(node.get(key), rtn, word, d)
    })
  }
}

// const testCases = [
//   { from: 'book', to: 'books', distance: 1 },
//   { from: 'book', to: 'cake', distance: 4 },
//   { from: 'book', to: 'boo', distance: 1 },
//   { from: 'books', to: 'boo', distance: 2 },
//   { from: 'wat', to: 'cook', distance: 4 },
//   { from: 'wat', to: 'book', distance: 4 },
//   { from: 'wat', to: 'books', distance: 5 },
//   { from: 'wat', to: 'what', distance: 1 },
//   { from: 'wat', to: 'water', distance: 2 },
// ]
//
// describe('calculates distance', () => {
//   testCases.forEach(testCase => {
//     it(`distance(${testCase.from}, ${testCase.to}) === ${testCase.distance}`, () => {
//       let { from, to, distance } = testCase
//
//       assert.equal(levenshteinDistance(from, to), distance)
//     })
//   })
// })
//
// describe('generates suggestions', () => {
//   it('for distance 1', () => {
//     const tree = new BKTree()
//
//     const testWords = ['book', 'books', 'cake', 'boo', 'cape', 'cart', 'boon', 'cook']
//
//     testWords.forEach(word => {
//       tree.add(word)
//     })
//
//     assert.deepEqual(tree.search('caqe'), ['cake', 'cape'])
//   })
//
//   it('for distance 2', () => {
//     const tree = new BKTree()
//
//     const testWords = ['book', 'books', 'cake', 'boo', 'cape', 'cart', 'boon', 'cook']
//
//     testWords.forEach(word => {
//       tree.add(word)
//     })
//
//     assert.deepEqual(tree.search('caqe', 2), ['cake', 'cape', 'cart'])
//   })
//
//   it('big word list', async () => {
//
//   })
// })

const readline = require('readline')

async function test() {
  console.time('build')
  const dict = await importFile('./data/ordmyndalisti.txt')
  console.timeEnd('build')

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.prompt()

  rl.on('line', (input) => {
    let [word, distance] = input.split(',')
    console.time('search')
    console.log(dict.search(word, Number(distance) || 1));
    console.timeEnd('search')

    rl.prompt()
  })
}

test()

function importFile(path) {
  return new Promise((resolve, reject) => {
    const tree = new BKTree()

    const reader = new LineByLineReader(path, {
      skipEmptyLines: true,
    })

    reader.on('line', word => {
      tree.add(word)
    })

    reader.on('error', err => {
      reject(err)
    })

    reader.on('end', () => {
      resolve(tree)
    })
  })
}
