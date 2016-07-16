const levenshtein = require('liblevenshtein')
const readline = require('readline')
const fs = require('fs')

function buildDictionary(completion_list) {
  console.time('build')
  // Assume "completion_list" is a list of terms you want to match against in
  // fuzzy queries.
  const builder = new levenshtein.Builder()
    .dictionary(completion_list)  // generate spelling candidates from unsorted completion_list
    .algorithm('transposition')          // use Levenshtein distance extended with transposition
    //.sort_candidates(true)               // sort the spelling candidates before returning them
    //.case_insensitive_sort(true)         // ignore character-casing while sorting terms
    .include_distance(false)             // just return the ordered terms (drop the distances)
    //.maximum_candidates(10)             // only want the top-10 candidates

  // Maximum number of spelling errors we will allow the spelling candidates to
  // have, with regard to the query term.
  const MAX_EDIT_DISTANCE = 1


  const transducer = builder.build()
  console.timeEnd('build')

  // Assume "term" corresponds to some query term. Once invoking
  // transducer.transduce(term, MAX_EDIT_DISTANCE), candidates will contain a list
  // of all spelling candidates from the completion list that are within
  // MAX_EDIT_DISTANCE units of error from the query term.
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.prompt()

  rl.on('line', (term) => {
    console.log(term);
    console.time('search')
    console.log(transducer.transduce(term, MAX_EDIT_DISTANCE));
    console.timeEnd('search')

    rl.prompt()
  })
}

const completion_list = []

const rl = readline.createInterface({
  input: fs.createReadStream('./data/ordmyndalisti.txt')
})

rl.on('line', (line) => {
  completion_list.push(line)
})

rl.on('close', () => {
  console.log(completion_list.length);
  buildDictionary(completion_list);
})
