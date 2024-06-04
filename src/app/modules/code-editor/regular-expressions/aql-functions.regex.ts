const aqlFunction = ['COUNT', 'DISTINCT', 'MIN', 'MAX', 'SUM', 'AVG', 'terminology']

const joined = '\\b(' + aqlFunction.join('|') + ')\\b'

export const aqlFunctionRegExp = new RegExp(joined)
