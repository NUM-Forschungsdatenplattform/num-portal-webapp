const archetypePredicate = [
  '[a-zA-Z][a-zA-Z0-9_]+', // openEHR
  '-', // -
  '[a-zA-Z][a-zA-Z0-9_]+', // EHR
  '-', // -
  '[a-zA-Z][a-zA-Z0-9_]+', // OBSERVATION
  '.', // .
  '[a-zA-Z][a-zA-Z0-9_]+', // blood_pressure
  '.', // .
  'v', // v
  '\\d+(\\.\\d+){0,2}', // 1 || 1.0.0
]

// openEHR-EHR-OBSERVATION.blood_pressure.v1
const joined = '\\b(' + archetypePredicate.map((m) => '(' + m + ')').join('') + ')\\b'

export const archetypePredicateRegExp = new RegExp(joined)
