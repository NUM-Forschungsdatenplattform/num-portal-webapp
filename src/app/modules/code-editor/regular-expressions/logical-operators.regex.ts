const logicalOperators = ['EXISTS', 'AND', 'OR', 'NOT']

const joined = '\\b(' + logicalOperators.join('|') + ')\\b'

export const logicalOperatorsRegExp = new RegExp(joined)
