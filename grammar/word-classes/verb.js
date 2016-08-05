import * as features from '../features'

export function parse(tag) {
  return {
    person: features.person(tag),
    number: features.number(tag),
    tense: features.tense(tag),
    voice: features.voice(tag),
    mood: features.mood(tag),
    impersonal: features.impersonal(tag),
    pronoun: features.pronoun(tag),
    participal: features.participal(tag),
    article: features.article(tag),
    gender: features.gender(tag),
    grammarCase: features.grammarCase(tag),
    declension: features.declension(tag),
    mode: features.mode(tag),
    supine: features.supine(tag),
  }
}

export function toString(tags) {
  const { impersonal, participal, voice, mood, tense, person, gender, number, grammarCase, declension, mode, supine } = tags
  const caseAndNumber = grammarCase ? grammarCase + number : number
  return [ impersonal, participal, voice, mood, tense, person, declension, gender, caseAndNumber, mode, supine ].filter(x => x).join('-')
}
