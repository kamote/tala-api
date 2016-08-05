import * as noun from './word-classes/noun'

const featuresMap = {
   // Numeral
  'to': ['grammarCase', 'gender', 'number'],
  // Pronoun
  'pfn': ['grammarCase', 'gender', 'number'],
  // Adjective
  'lo': ['grammarCase', 'gender', 'number', 'degree', 'article'],
  // Verb
  'so': ['person', 'number', 'tense', 'voice', 'mood', 'impersonal', 'pronoun', 'participal', 'article', 'gender', 'grammarCase', 'declension', 'mode', 'supine'],
  // Other pronoun
  'fn': ['grammarCase', 'gender', 'number'],
  // Adverb
  'ao': ['degree'],
}

const parser = {
  grammarCase(tag) {
    if (tag.includes('NFET')) {
      return 'NF'
    }

    return ['NF', 'ÞF', 'ÞGF', 'EF'].filter(x => tag.includes(x))[0]
  },

  gender(tag) {
    return ['KK', 'KVK', 'HK'].filter(x => tag.includes(x))[0]
  },

  number(tag) {
    return ['ET', 'FT'].filter(x => tag.includes(x))[0]
  },

  definite(tag) {
    return ['ESB', 'EVB', 'FSB', 'FVB', 'MST'].filter(x => tag.includes(x))[0]
  },

  article(tag, wordClass) {
    if (wordClass === 'lo') {
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
    if (tag.split('-').includes('NT')) {
      return 'NT'
    }
    if (tag.split('-').includes('ÞT')) {
      return 'ÞT'
    }
    return undefined
  },

  voice(tag) {
    return ['GM', 'MM', 'OP'].filter(x => tag.includes(x))[0]
  },

  mood(tag) {
    return ['FH', 'VH', 'BH'].filter(x => tag.includes(x))[0]
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

  participal(tag) {
    return ['LHÞT', 'LHNT'].filter(x => tag.includes(x))[0]
  },

  declension(tag) {
    return ['VB', 'SB'].filter(x => tag.includes(x))[0]
  },

  mode(tag) {
    return ['NH'].filter(x => tag.includes(x))[0]
  },

  supine(tag) {
    return tag.includes('SAGNB') ? 'SAGNB' : undefined
  }
}

export function toString(wordClass, tags) {
  if (wordClass === 'to') {
    const { gender, grammarCase, number } = tags
    return `${gender}_${grammarCase}${number}`
  }

  if (wordClass === 'pfn') {
    const { grammarCase, number } = tags
    return grammarCase + number
  }

  if (wordClass === 'lo') {
    const { degree, gender, grammarCase, number } = tags
    return `${degree}-${gender}-${grammarCase}${number}`
  }

  if (wordClass === 'so') {
    const { impersonal, participal, voice, mood, tense, person, gender, number, grammarCase, declension, mode, supine } = tags
    const caseAndNumber = grammarCase ? grammarCase + number : number
    return [ impersonal, participal, voice, mood, tense, person, declension, gender, caseAndNumber, mode, supine ].filter(x => x).join('-')
  }
}

export function parse(wordClass, grammarTag) {
  switch (wordClass) {
    case 'hk':
    case 'kk':
    case 'kvk':
      return noun.parse(grammarTag)
    default: {
      const features = featuresMap[wordClass]

      if (!features) {
        throw new Error(`Unsupported word class: ${wordClass}`)
      }

      const result = {}

      features.forEach(feature => {
        const tag = parser[feature](grammarTag, wordClass)

        if (tag != null) {
          result[feature] = tag
        }
      })

      return result
    }
  }


}
