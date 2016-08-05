export function grammarCase(tag) {
  return ['NF', 'ÞF', 'ÞGF', 'EF'].filter(x => tag.includes(x))[0]
}

export function number(tag) {
  return ['ET', 'FT'].filter(x => tag.includes(x))[0]
}

export function article(tag) {
  if (tag.includes('gr')) {
    return 'gr'
  }

  return ''
}

export function gender(tag) {
  return ['KK', 'KVK', 'HK'].filter(x => tag.includes(x))[0]
}

export function degree(tag) {
  return ['FST', 'FSB', 'FVB', 'MST', 'EST', 'ESB', 'EVB'].filter(x => tag.includes(x))[0]
}

export function person(tag) {
  return ['1P', '2P', '3P'].filter(x => tag.includes(x))[0]
}

export function tense(tag) {
  if (tag.split('-').includes('NT')) {
    return 'NT'
  }
  if (tag.split('-').includes('ÞT')) {
    return 'ÞT'
  }
}

export function voice(tag) {
  return ['GM', 'MM', 'OP'].filter(x => tag.includes(x))[0]
}

export function mood(tag) {
  return ['FH', 'VH', 'BH'].filter(x => tag.includes(x))[0]
}

export function impersonal(tag) {
  return ['OP'].filter(x => tag.includes(x))[0]
}

export function pronoun(tag) {
  return ['FN'].filter(x => tag.includes(x))[0]
}

export function participal(tag) {
  return ['LHÞT', 'LHNT'].filter(x => tag.includes(x))[0]
}

export function declension(tag) {
  return ['VB', 'SB'].filter(x => tag.includes(x))[0]
}

export function mode(tag) {
  return ['NH'].filter(x => tag.includes(x))[0]
}

export function supine(tag) {
  return tag.includes('SAGNB') ? 'SAGNB' : undefined
}

export function definite(tag) {
  return ['ESB', 'EVB', 'FSB', 'FVB', 'MST'].filter(x => tag.includes(x))[0]
}
