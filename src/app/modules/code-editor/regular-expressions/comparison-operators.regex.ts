const comparisonOperators = ['=', 'Equal', '>', '>=', '<', '<=', '!=', 'LIKE', 'matches']

const joined = '(' + comparisonOperators.map((op) => '\\' + op).join('|') + ')'

export const comparisonOperatorsRegExp = new RegExp(joined)
