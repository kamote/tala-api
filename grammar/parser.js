function isNoun(wordClass) {
  return wordClass === 'hk' ||
         wordClass === 'kk' ||
         wordClass === 'kvk'
}

const featuresMap = {
  // Nouns
  'hk': ['grammarCase', 'number', 'article', 'gender'],
  'kk': ['grammarCase', 'number', 'article', 'gender'],
  'kvk': ['grammarCase', 'number', 'article', 'gender'],
   // Numeral
  'to': ['grammarCase', 'gender', 'number'],
  // Pronoun
  'pfn': ['grammarCase', 'gender', 'number'],
  // Adjective
  'lo': ['grammarCase', 'gender', 'number', 'degree', 'article'],
  // Verb
  'so': ['person', 'number', 'tense', 'voice', 'mood', 'impersonal', 'pronoun', 'past participal', 'article', 'gender'],
  // Other pronoun
  'fn': ['grammarCase', 'gender', 'number'],
  // Adverb
  'ao': ['degree'],
}

const parser = {
  grammarCase(tag) {
    return ['NF', 'ÞF', 'ÞGF', 'EF'].filter(x => tag.includes(x))[0]
  },

  gender(tag, wordClass) {
    if (isNoun(wordClass)) {
      return wordClass.toUpperCase()
    }

    return ['KK', 'KVK', 'HK'].filter(x => tag.includes(x))[0]
  },

  number(tag) {
    return ['ET', 'FT'].filter(x => tag.includes(x))[0]
  },

  definite(tag) {
    return ['ESB', 'EVB', 'FSB', 'FVB', 'MST'].filter(x => tag.includes(x))[0]
  },

  article(tag, wordClass) {
    if (isNoun(wordClass)) {
      if (tag.includes('gr')) {
        return 'gr'
      } else {
        return ''
      }
    } else if (wordClass === 'lo') {
      if (['EVB', 'FVB'].filter(x => tag.includes(x)).length) {
        return 'gr'
      } else if (['ESB', 'FSB'].filter(x => tag.includes(x)).length) {
        return ''
      }
    } else if (wordClass === 'so') {
      if (tag.includes('SB')) {
        return 'gr'
      } else if (tag.includes('VB')) {
        return ''
      }
    }

    return null
  },

  person(tag) {
    return ['1P', '2P', '3P'].filter(x => tag.includes(x))[0]
  },

  tense(tag) {
    return ['NT', 'ÞT'].filter(x => tag.includes(x))[0]
  },

  voice(tag) {
    return ['GM', 'MM', 'OP'].filter(x => tag.includes(x))[0]
  },

  mood(tag) {
    return ['FH', 'VH'].filter(x => tag.includes(x))[0]
  },

  impersonal(tag) {
    return ['OP'].filter(x => tag.includes(x))[0]
  },

  pronoun(tag) {
    return ['FN'].filter(x => tag.includes(x))[0]
  },

  degree(tag) {
    return ['FST', 'FSB', 'FVB', 'MST', 'EST', 'ESB', 'EVB'].filter(x => tag.includes(x))[0]
  },

  ['past participal']: function (tag) {
    return ['LHÞT'].filter(x => tag.includes(x))[0]
  },
}

export function toString(wordClass, tags) {
  if (isNoun(wordClass)) {
    let { grammarCase, number, article } = tags
    return grammarCase + number + article
  }

  if (wordClass === 'to') {
    let { gender, grammarCase, number } = tags
    return `${gender}_${grammarCase}${number}`
  }

  if (wordClass === 'pfn') {
    let { grammarCase, number } = tags
    return grammarCase + number
  }

  if (wordClass === 'lo') {
    let { degree, gender, grammarCase, number } = tags
    return `${degree}-${gender}-${grammarCase}${number}`
  }
}

export function parse(wordClass, grammarTag) {
  let features = featuresMap[wordClass]

  if (!features) {
    throw new Error(`Unsupported word class: ${wordClass}`)
  }

  var result = {}

  features.forEach(x => {
    let tag = parser[x].call(null, grammarTag, wordClass)

    if (tag !== null && tag !== undefined) {
      result[x] = tag
    }
  })

  return result
}
