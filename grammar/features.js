export function grammarCase(tag) {
  if (tag.includes('NFET')) {
    return 'NF'
  }

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
