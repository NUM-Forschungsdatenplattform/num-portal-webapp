import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'

export const resultSetMock: IAqlExecutionResponse = {
  q:
    'Select c0/category/value, c0/category/defining_code/code_string, c0/category/defining_code/terminology_id/value, c0/territory/code_string, c0/territory/terminology_id/value, c0/name/value, c0/uid/value, c0/context/start_time/value, c0/language/code_string, c0/language/terminology_id/value from EHR e contains COMPOSITION c0[openEHR-EHR-COMPOSITION.report.v1]',
  columns: [
    {
      path: '/category/value',
      name: 'category::value',
    },
    {
      path: '/category/defining_code/code_string',
      name: 'category::code_string',
    },
    {
      path:
        '/category/defining_code/terminology_id/value/and_this_might_also_be_a_very_very_long_path_name/but_the_full_text_should_be_shown_in_the_tooltip',
      name: 'category::terminology_id',
    },
    {
      path: '/territory/code_string',
      name: 'territory::code_string',
    },
    {
      path: '/territory/terminology_id/value',
      name: 'territory::terminology_id',
    },
    {
      path: '/name/value',
      name: 'name::value',
    },
    {
      path: '/uid/value',
      name: 'uid::value',
    },
    {
      path: '/context/start_time/value',
      name: 'start_time::value',
    },
    {
      path: '/language/code_string',
      name: 'language::code_string',
    },
    {
      path: '/language/terminology_id/value',
      name: 'language::terminology_id',
    },
  ],
  rows: [
    [
      'event',
      '433',
      'openehr',
      'DE',
      'ISO_3166-1',
      'Virologischer Befund',
      'a5cd4030-fadb-459f-8844-29a5adafdcd5::local.ehrbase.org::1',
      '2021-05-04T14:36:55+02:00',
      'de',
      'ISO_639-1',
    ],
    [
      'event',
      '433',
      'openehr',
      'DE',
      'ISO_3166-1',
      'Virologischer Befund',
      'b5e33ab0-a2f7-4727-ac85-b7dad623be0c::local.ehrbase.org::1',
      '2022-05-04T14:36:55+02:00',
      'de',
      'ISO_639-1',
    ],
    [
      'event',
      '433',
      'openehr',
      'DE',
      'ISO_3166-1',
      'Virologischer Befund',
      '8bf78561-0fe1-4789-a1de-85b5510b16a7::local.ehrbase.org::1',
      '2020-10-04T14:36:55+02:00',
      'de',
      'ISO_639-1',
    ],
    [
      'event',
      '433',
      'openehr',
      'RU',
      'ISO_3166-1',
      'Virologischer Befund',
      '9bf78561-0fe1-4789-a1de-85b5510b16a7::local.ehrbase.org::1',
      '2020-05-07T14:36:55+02:00',
      'ru',
      'ISO_639-1',
    ],
    [
      'event',
      '433',
      'openehr',
      'EN',
      'ISO_3166-1',
      'Virologischer Befund',
      '10f78561-0fe1-4789-a1de-85b5510b16a7::local.ehrbase.org::1',
      '2020-05-04T14:36:55+02:00',
      'en',
      'ISO_639-1',
    ],
    [
      'event',
      '433',
      'openehr',
      'NL',
      'ISO_3166-1',
      'Virologischer Befund',
      '11f78561-0fe1-4789-a1de-85b5510b16a7::local.ehrbase.org::1',
      '2020-05-04T14:36:55+02:00',
      'nl',
      'ISO_639-1',
    ],
  ],
}
