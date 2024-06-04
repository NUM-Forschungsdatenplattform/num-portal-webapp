const queryStructure = [
  'AS',
  'TOP',
  'SELECT',
  'FROM',
  'WHERE',
  'CONTAINS',
  'ORDER BY',
  'LIMIT',
  'DESC',
  'DESCENDING',
  'ASC',
  'ASCENDING',
  'FORWARD',
  'BACKWARD',
  'OFFSET',
  'LIMIT',
]

const joined = '\\b(' + queryStructure.join('|') + ')\\b'

export const queryStructureRegExp = new RegExp(joined)
