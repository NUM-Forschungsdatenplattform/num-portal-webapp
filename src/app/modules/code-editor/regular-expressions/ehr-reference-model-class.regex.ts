const ehrReferenceModelClasses = [
  'EHR',
  'EHR_ACCESS',
  'EHR_STATUS',
  'VERSION',
  'VERSIONED_OBJECT',
  'VERSIONED_EHR_ACCESS',
  'VERSIONED_EHR_STATUS',
  'VERSIONED_FOLDER',
  'VERSIONED_COMPOSITION',
  'CONTRIBUTION',
  'COMPOSITION',
  'SECTION',
  'ADMIN_ENTRY',
  'OBSERVATION',
  'EVALUATION',
  'INSTRUCTION',
  'ACTION',
]

const joined = '\\b(' + ehrReferenceModelClasses.join('|') + ')\\b'

export const ehrReferenceModelClassRegExp = new RegExp(joined)
