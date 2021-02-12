import { IAqlExecutionResponse } from 'src/app/shared/models/aql/execution/aql-execution-response.interface'

export const mockResultSetFlat: IAqlExecutionResponse = {
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
    [
      'event',
      '433',
      'openehr',
      null,
      null,
      'Virologischer Befund',
      '1hz98561-0fe1-4789-a1de-85b5510b16a7::local.ehrbase.org::1',
      '2020-05-04T14:36:55+02:00',
      'de',
      'ISO_639-1',
    ],
    [
      'event',
      '433',
      'openehr',
      'EN',
      'ISO_3166-1',
      'Virologischer Befund',
      'ghk78561-0fe1-4789-a1de-85b5510b16a7::local.ehrbase.org::1',
      '2020-05-04T14:36:55+02:00',
      'en',
      'ISO_639-1',
    ],
    [
      'event',
      '433',
      'openehr',
      'EN',
      'ISO_3166-1',
      'Virologischer Befund',
      '19f78561-0fe1-4789-a1de-85b5510b16a7::local.ehrbase.org::1',
      '2020-05-04T14:36:55+02:00',
      null,
      null,
    ],
    [
      'event',
      '433',
      'openehr',
      'DE',
      'ISO_3166-1',
      'Virologischer Befund',
      '15f78561-0fe1-4789-a1de-85b5510b16a7::local.ehrbase.org::1',
      '2020-12-04T14:36:55+02:00',
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
      '17f78561-0fe1-4789-a1de-85b5510b16a7::local.ehrbase.org::1',
      '2020-05-04T14:36:55+02:00',
      null,
      null,
    ],
  ],
}

export const mockResultSetJson: IAqlExecutionResponse = {
  q:
    'SELECT c0 as openEHR_EHR_COMPOSITION_event_summary_v0,  c1 as openEHR_EHR_COMPOSITION_report_result_v1 FROM  EHR e  contains (COMPOSITION c0[openEHR-EHR-COMPOSITION.event_summary.v0]  and COMPOSITION c1[openEHR-EHR-COMPOSITION.report-result.v1])',
  columns: [
    {
      path: 'c0',
      name: '#0',
    },
    {
      path: 'c1',
      name: '#1',
    },
  ],
  rows: [
    [
      {
        uid: {
          _type: 'OBJECT_VERSION_ID',
          value: 'a5cd4030-fadb-459f-8844-29a5adafdcd5::local.ehrbase.org::1',
        },
        name: {
          _type: 'DV_TEXT',
        },
        _type: 'COMPOSITION',
        context: {
          _type: 'EVENT_CONTEXT',
          setting: {
            _type: 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              _type: 'CODE_PHRASE',
              code_string: '238',
              terminology_id: {
                _type: 'TERMINOLOGY_ID',
                value: 'openehr',
              },
            },
          },
          start_time: {
            _type: 'DV_DATE_TIME',
            value: '2020-05-04T14:36:55+02:00',
          },
          health_care_facility: {
            name: 'string',
            _type: 'PARTY_IDENTIFIED',
            external_ref: {
              id: {
                _type: 'GENERIC_ID',
                value: '123',
                scheme: 'string',
              },
              _type: 'PARTY_REF',
              namespace: 'string',
            },
          },
        },
        category: {
          _type: 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            _type: 'CODE_PHRASE',
            code_string: '433',
            terminology_id: {
              _type: 'TERMINOLOGY_ID',
              value: 'openehr',
            },
          },
        },
        composer: {
          name: 'name',
          _type: 'PARTY_IDENTIFIED',
          external_ref: {
            id: {
              _type: 'GENERIC_ID',
              value: '123',
              scheme: 'scheme',
            },
            type: 'ANY',
            _type: 'PARTY_REF',
            namespace: 'MHH',
          },
        },
        language: {
          _type: 'CODE_PHRASE',
          code_string: 'de',
          terminology_id: {
            _type: 'TERMINOLOGY_ID',
            value: 'ISO_639-1',
          },
        },
        territory: {
          _type: 'CODE_PHRASE',
          code_string: 'DE',
          terminology_id: {
            _type: 'TERMINOLOGY_ID',
            value: 'ISO_3166-1',
          },
        },
        archetype_details: {
          _type: 'ARCHETYPED',
          rm_version: '1.0.4',
          template_id: {
            _type: 'TEMPLATE_ID',
            value: 'Virologischer Befund',
          },
          archetype_id: {
            _type: 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.report-result.v1',
          },
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.report-result.v1',
        content: [
          {
            name: {
              value: 'Befund',
              _type: 'DV_TEXT',
            },
            _type: 'OBSERVATION',
            subject: {
              _type: 'PARTY_SELF',
            },
            encoding: {
              code_string: 'UTF-8',
              terminology_id: {
                name: 'IANA_character-sets',
                value: 'IANA_character-sets',
              },
            },
            language: {
              code_string: 'de',
              terminology_id: {
                name: 'ISO_639-1',
                value: 'ISO_639-1',
              },
            },
            data: {
              name: {
                value: 'Event Series',
                _type: 'DV_TEXT',
              },
              origin: {
                value: '2020-05-04T14:36:55.915+02:00',
                _type: 'DV_DATE_TIME',
              },
              archetype_node_id: 'at0001',
              events: [
                {
                  name: {
                    value: 'Jedes Ereignis',
                    _type: 'DV_TEXT',
                  },
                  time: {
                    value: '2020-05-04T14:36:55.915+02:00',
                    _type: 'DV_DATE_TIME',
                  },
                  _type: 'POINT_EVENT',
                  data: {
                    name: {
                      value: 'Tree',
                      _type: 'DV_TEXT',
                    },
                    archetype_node_id: 'at0003',
                    _type: 'ITEM_TREE',
                    items: [
                      {
                        name: {
                          value: 'Probe',
                          _type: 'DV_TEXT',
                        },
                        _type: 'CLUSTER',
                        items: [
                          {
                            name: {
                              value: 'Zeitpunkt des Probeneingangs',
                              _type: 'DV_TEXT',
                            },
                            value: {
                              value: '2020-05-03T00:00+02:00',
                              epoch_offset: 1.5884568e9,
                              _type: 'DV_DATE_TIME',
                            },
                            _type: 'ELEMENT',
                            archetype_node_id: 'at0034',
                          },
                        ],
                        archetype_details: [
                          {
                            value: {
                              rm_version: '1.0.1',
                              archetype_id: {
                                value: 'openEHR-EHR-CLUSTER.specimen.v1',
                              },
                              _type: 'ARCHETYPED',
                            },
                          },
                        ],
                        archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                      },
                      {
                        name: {
                          value: 'Test-Panel',
                          _type: 'DV_TEXT',
                        },
                        _type: 'CLUSTER',
                        archetype_details: [
                          {
                            value: {
                              rm_version: '1.0.1',
                              archetype_id: {
                                value: 'openEHR-EHR-CLUSTER.laboratory_test_panel.v0',
                              },
                              _type: 'ARCHETYPED',
                            },
                          },
                        ],
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_panel.v0',
                        items: [
                          {
                            name: {
                              value: 'Pro Virus',
                              _type: 'DV_TEXT',
                            },
                            _type: 'CLUSTER',
                            items: [
                              {
                                name: {
                                  value: 'Zugehörige Laborprobe',
                                  _type: 'DV_TEXT',
                                },
                                value: {
                                  id: '12',
                                  type: '12',
                                  issuer: '12',
                                  assigner: '12',
                                  _type: 'DV_IDENTIFIER',
                                },
                                _type: 'ELEMENT',
                                archetype_node_id: 'at0026',
                              },
                            ],
                            archetype_details: [
                              {
                                value: {
                                  rm_version: '1.0.1',
                                  archetype_id: {
                                    value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                                  },
                                  _type: 'ARCHETYPED',
                                },
                              },
                            ],
                            archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                          },
                        ],
                      },
                    ],
                  },
                  archetype_node_id: 'at0002',
                },
              ],
              _type: 'HISTORY',
            },
            archetype_details: {
              value: {
                rm_version: '1.0.1',
                archetype_id: {
                  value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
                },
              },
              _type: 'ARCHETYPED',
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
          },
        ],
      },
      {
        uid: {
          _type: 'OBJECT_VERSION_ID',
          value: 'a5cd4030-fadb-459f-8844-29a5adafdcd5::local.ehrbase.org::1',
        },
        name: {
          _type: 'DV_TEXT',
        },
        _type: 'COMPOSITION',
        context: {
          _type: 'EVENT_CONTEXT',
          setting: {
            _type: 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              _type: 'CODE_PHRASE',
              code_string: '238',
              terminology_id: {
                _type: 'TERMINOLOGY_ID',
                value: 'openehr',
              },
            },
          },
          start_time: {
            _type: 'DV_DATE_TIME',
            value: '2020-05-04T14:36:55+02:00',
          },
          health_care_facility: {
            name: 'string',
            _type: 'PARTY_IDENTIFIED',
            external_ref: {
              id: {
                _type: 'GENERIC_ID',
                value: '123',
                scheme: 'string',
              },
              _type: 'PARTY_REF',
              namespace: 'string',
            },
          },
        },
        category: {
          _type: 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            _type: 'CODE_PHRASE',
            code_string: '433',
            terminology_id: {
              _type: 'TERMINOLOGY_ID',
              value: 'openehr',
            },
          },
        },
        composer: {
          name: 'name',
          _type: 'PARTY_IDENTIFIED',
          external_ref: {
            id: {
              _type: 'GENERIC_ID',
              value: '123',
              scheme: 'scheme',
            },
            type: 'ANY',
            _type: 'PARTY_REF',
            namespace: 'MHH',
          },
        },
        language: {
          _type: 'CODE_PHRASE',
          code_string: 'de',
          terminology_id: {
            _type: 'TERMINOLOGY_ID',
            value: 'ISO_639-1',
          },
        },
        territory: {
          _type: 'CODE_PHRASE',
          code_string: 'DE',
          terminology_id: {
            _type: 'TERMINOLOGY_ID',
            value: 'ISO_3166-1',
          },
        },
        archetype_details: {
          _type: 'ARCHETYPED',
          rm_version: '1.0.4',
          template_id: {
            _type: 'TEMPLATE_ID',
            value: 'Virologischer Befund',
          },
          archetype_id: {
            _type: 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.report-result.v1',
          },
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.report-result.v1',
        content: [
          {
            name: {
              value: 'Befund',
              _type: 'DV_TEXT',
            },
            _type: 'OBSERVATION',
            subject: {
              _type: 'PARTY_SELF',
            },
            encoding: {
              code_string: 'UTF-8',
              terminology_id: {
                name: 'IANA_character-sets',
                value: 'IANA_character-sets',
              },
            },
            language: {
              code_string: 'de',
              terminology_id: {
                name: 'ISO_639-1',
                value: 'ISO_639-1',
              },
            },
            data: {
              name: {
                value: 'Event Series',
                _type: 'DV_TEXT',
              },
              origin: {
                value: '2020-05-04T14:36:55.915+02:00',
                _type: 'DV_DATE_TIME',
              },
              archetype_node_id: 'at0001',
              events: [
                {
                  name: {
                    value: 'Jedes Ereignis',
                    _type: 'DV_TEXT',
                  },
                  time: {
                    value: '2020-05-04T14:36:55.915+02:00',
                    _type: 'DV_DATE_TIME',
                  },
                  _type: 'POINT_EVENT',
                  data: {
                    name: {
                      value: 'Tree',
                      _type: 'DV_TEXT',
                    },
                    archetype_node_id: 'at0003',
                    _type: 'ITEM_TREE',
                    items: [
                      {
                        name: {
                          value: 'Probe',
                          _type: 'DV_TEXT',
                        },
                        _type: 'CLUSTER',
                        items: [
                          {
                            name: {
                              value: 'Zeitpunkt des Probeneingangs',
                              _type: 'DV_TEXT',
                            },
                            value: {
                              value: '2020-05-03T00:00+02:00',
                              epoch_offset: 1.5884568e9,
                              _type: 'DV_DATE_TIME',
                            },
                            _type: 'ELEMENT',
                            archetype_node_id: 'at0034',
                          },
                        ],
                        archetype_details: [
                          {
                            value: {
                              rm_version: '1.0.1',
                              archetype_id: {
                                value: 'openEHR-EHR-CLUSTER.specimen.v1',
                              },
                              _type: 'ARCHETYPED',
                            },
                          },
                        ],
                        archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                      },
                      {
                        name: {
                          value: 'Test-Panel',
                          _type: 'DV_TEXT',
                        },
                        _type: 'CLUSTER',
                        archetype_details: [
                          {
                            value: {
                              rm_version: '1.0.1',
                              archetype_id: {
                                value: 'openEHR-EHR-CLUSTER.laboratory_test_panel.v0',
                              },
                              _type: 'ARCHETYPED',
                            },
                          },
                        ],
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_panel.v0',
                        items: [
                          {
                            name: {
                              value: 'Pro Virus',
                              _type: 'DV_TEXT',
                            },
                            _type: 'CLUSTER',
                            items: [
                              {
                                name: {
                                  value: 'Zugehörige Laborprobe',
                                  _type: 'DV_TEXT',
                                },
                                value: {
                                  id: '12',
                                  type: '12',
                                  issuer: '12',
                                  assigner: '12',
                                  _type: 'DV_IDENTIFIER',
                                },
                                _type: 'ELEMENT',
                                archetype_node_id: 'at0026',
                              },
                            ],
                            archetype_details: [
                              {
                                value: {
                                  rm_version: '1.0.1',
                                  archetype_id: {
                                    value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                                  },
                                  _type: 'ARCHETYPED',
                                },
                              },
                            ],
                            archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                          },
                        ],
                      },
                    ],
                  },
                  archetype_node_id: 'at0002',
                },
              ],
              _type: 'HISTORY',
            },
            archetype_details: {
              value: {
                rm_version: '1.0.1',
                archetype_id: {
                  value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
                },
              },
              _type: 'ARCHETYPED',
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
          },
        ],
      },
    ],
    [
      {
        uid: {
          _type: 'OBJECT_VERSION_ID',
          value: 'b5e33ab0-a2f7-4727-ac85-b7dad623be0c::local.ehrbase.org::1',
        },
        name: {
          _type: 'DV_TEXT',
        },
        _type: 'COMPOSITION',
        context: {
          _type: 'EVENT_CONTEXT',
          setting: {
            _type: 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              _type: 'CODE_PHRASE',
              code_string: '238',
              terminology_id: {
                _type: 'TERMINOLOGY_ID',
                value: 'openehr',
              },
            },
          },
          start_time: {
            _type: 'DV_DATE_TIME',
            value: '2020-05-04T14:36:55+02:00',
          },
          health_care_facility: {
            name: 'string',
            _type: 'PARTY_IDENTIFIED',
            external_ref: {
              id: {
                _type: 'GENERIC_ID',
                value: '123',
                scheme: 'string',
              },
              _type: 'PARTY_REF',
              namespace: 'string',
            },
          },
        },
        category: {
          _type: 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            _type: 'CODE_PHRASE',
            code_string: '433',
            terminology_id: {
              _type: 'TERMINOLOGY_ID',
              value: 'openehr',
            },
          },
        },
        composer: {
          name: 'name',
          _type: 'PARTY_IDENTIFIED',
          external_ref: {
            id: {
              _type: 'GENERIC_ID',
              value: '123',
              scheme: 'scheme',
            },
            type: 'ANY',
            _type: 'PARTY_REF',
            namespace: 'MHH',
          },
        },
        language: {
          _type: 'CODE_PHRASE',
          code_string: 'de',
          terminology_id: {
            _type: 'TERMINOLOGY_ID',
            value: 'ISO_639-1',
          },
        },
        territory: {
          _type: 'CODE_PHRASE',
          code_string: 'DE',
          terminology_id: {
            _type: 'TERMINOLOGY_ID',
            value: 'ISO_3166-1',
          },
        },
        archetype_details: {
          _type: 'ARCHETYPED',
          rm_version: '1.0.4',
          template_id: {
            _type: 'TEMPLATE_ID',
            value: 'Virologischer Befund',
          },
          archetype_id: {
            _type: 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.report-result.v1',
          },
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.report-result.v1',
        content: [
          {
            name: {
              value: 'Befund',
              _type: 'DV_TEXT',
            },
            _type: 'OBSERVATION',
            subject: {
              _type: 'PARTY_SELF',
            },
            encoding: {
              code_string: 'UTF-8',
              terminology_id: {
                name: 'IANA_character-sets',
                value: 'IANA_character-sets',
              },
            },
            language: {
              code_string: 'de',
              terminology_id: {
                name: 'ISO_639-1',
                value: 'ISO_639-1',
              },
            },
            data: {
              name: {
                value: 'Event Series',
                _type: 'DV_TEXT',
              },
              origin: {
                value: '2020-05-04T14:36:55.915+02:00',
                _type: 'DV_DATE_TIME',
              },
              archetype_node_id: 'at0001',
              events: [
                {
                  name: {
                    value: 'Jedes Ereignis',
                    _type: 'DV_TEXT',
                  },
                  time: {
                    value: '2020-05-04T14:36:55.915+02:00',
                    _type: 'DV_DATE_TIME',
                  },
                  _type: 'POINT_EVENT',
                  data: {
                    name: {
                      value: 'Tree',
                      _type: 'DV_TEXT',
                    },
                    archetype_node_id: 'at0003',
                    _type: 'ITEM_TREE',
                    items: [
                      {
                        name: {
                          value: 'Probe',
                          _type: 'DV_TEXT',
                        },
                        _type: 'CLUSTER',
                        items: [
                          {
                            name: {
                              value: 'Zeitpunkt des Probeneingangs',
                              _type: 'DV_TEXT',
                            },
                            value: {
                              value: '2020-05-03T00:00+02:00',
                              epoch_offset: 1.5884568e9,
                              _type: 'DV_DATE_TIME',
                            },
                            _type: 'ELEMENT',
                            archetype_node_id: 'at0034',
                          },
                        ],
                        archetype_details: [
                          {
                            value: {
                              rm_version: '1.0.1',
                              archetype_id: {
                                value: 'openEHR-EHR-CLUSTER.specimen.v1',
                              },
                              _type: 'ARCHETYPED',
                            },
                          },
                        ],
                        archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                      },
                      {
                        name: {
                          value: 'Test-Panel',
                          _type: 'DV_TEXT',
                        },
                        _type: 'CLUSTER',
                        archetype_details: [
                          {
                            value: {
                              rm_version: '1.0.1',
                              archetype_id: {
                                value: 'openEHR-EHR-CLUSTER.laboratory_test_panel.v0',
                              },
                              _type: 'ARCHETYPED',
                            },
                          },
                        ],
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_panel.v0',
                        items: [
                          {
                            name: {
                              value: 'Pro Virus',
                              _type: 'DV_TEXT',
                            },
                            _type: 'CLUSTER',
                            items: [
                              {
                                name: {
                                  value: 'Zugehörige Laborprobe',
                                  _type: 'DV_TEXT',
                                },
                                value: {
                                  id: '12',
                                  type: '12',
                                  issuer: '12',
                                  assigner: '12',
                                  _type: 'DV_IDENTIFIER',
                                },
                                _type: 'ELEMENT',
                                archetype_node_id: 'at0026',
                              },
                            ],
                            archetype_details: [
                              {
                                value: {
                                  rm_version: '1.0.1',
                                  archetype_id: {
                                    value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                                  },
                                  _type: 'ARCHETYPED',
                                },
                              },
                            ],
                            archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                          },
                        ],
                      },
                    ],
                  },
                  archetype_node_id: 'at0002',
                },
              ],
              _type: 'HISTORY',
            },
            archetype_details: {
              value: {
                rm_version: '1.0.1',
                archetype_id: {
                  value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
                },
              },
              _type: 'ARCHETYPED',
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
          },
        ],
      },
      {
        uid: {
          _type: 'OBJECT_VERSION_ID',
          value: 'b5e33ab0-a2f7-4727-ac85-b7dad623be0c::local.ehrbase.org::1',
        },
        name: {
          _type: 'DV_TEXT',
        },
        _type: 'COMPOSITION',
        context: {
          _type: 'EVENT_CONTEXT',
          setting: {
            _type: 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              _type: 'CODE_PHRASE',
              code_string: '238',
              terminology_id: {
                _type: 'TERMINOLOGY_ID',
                value: 'openehr',
              },
            },
          },
          start_time: {
            _type: 'DV_DATE_TIME',
            value: '2020-05-04T14:36:55+02:00',
          },
          health_care_facility: {
            name: 'string',
            _type: 'PARTY_IDENTIFIED',
            external_ref: {
              id: {
                _type: 'GENERIC_ID',
                value: '123',
                scheme: 'string',
              },
              _type: 'PARTY_REF',
              namespace: 'string',
            },
          },
        },
        category: {
          _type: 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            _type: 'CODE_PHRASE',
            code_string: '433',
            terminology_id: {
              _type: 'TERMINOLOGY_ID',
              value: 'openehr',
            },
          },
        },
        composer: {
          name: 'name',
          _type: 'PARTY_IDENTIFIED',
          external_ref: {
            id: {
              _type: 'GENERIC_ID',
              value: '123',
              scheme: 'scheme',
            },
            type: 'ANY',
            _type: 'PARTY_REF',
            namespace: 'MHH',
          },
        },
        language: {
          _type: 'CODE_PHRASE',
          code_string: 'de',
          terminology_id: {
            _type: 'TERMINOLOGY_ID',
            value: 'ISO_639-1',
          },
        },
        territory: {
          _type: 'CODE_PHRASE',
          code_string: 'DE',
          terminology_id: {
            _type: 'TERMINOLOGY_ID',
            value: 'ISO_3166-1',
          },
        },
        archetype_details: {
          _type: 'ARCHETYPED',
          rm_version: '1.0.4',
          template_id: {
            _type: 'TEMPLATE_ID',
            value: 'Virologischer Befund',
          },
          archetype_id: {
            _type: 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.report-result.v1',
          },
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.report-result.v1',
        content: [
          {
            name: {
              value: 'Befund',
              _type: 'DV_TEXT',
            },
            _type: 'OBSERVATION',
            subject: {
              _type: 'PARTY_SELF',
            },
            encoding: {
              code_string: 'UTF-8',
              terminology_id: {
                name: 'IANA_character-sets',
                value: 'IANA_character-sets',
              },
            },
            language: {
              code_string: 'de',
              terminology_id: {
                name: 'ISO_639-1',
                value: 'ISO_639-1',
              },
            },
            data: {
              name: {
                value: 'Event Series',
                _type: 'DV_TEXT',
              },
              origin: {
                value: '2020-05-04T14:36:55.915+02:00',
                _type: 'DV_DATE_TIME',
              },
              archetype_node_id: 'at0001',
              events: [
                {
                  name: {
                    value: 'Jedes Ereignis',
                    _type: 'DV_TEXT',
                  },
                  time: {
                    value: '2020-05-04T14:36:55.915+02:00',
                    _type: 'DV_DATE_TIME',
                  },
                  _type: 'POINT_EVENT',
                  data: {
                    name: {
                      value: 'Tree',
                      _type: 'DV_TEXT',
                    },
                    archetype_node_id: 'at0003',
                    _type: 'ITEM_TREE',
                    items: [
                      {
                        name: {
                          value: 'Probe',
                          _type: 'DV_TEXT',
                        },
                        _type: 'CLUSTER',
                        items: [
                          {
                            name: {
                              value: 'Zeitpunkt des Probeneingangs',
                              _type: 'DV_TEXT',
                            },
                            value: {
                              value: '2020-05-03T00:00+02:00',
                              epoch_offset: 1.5884568e9,
                              _type: 'DV_DATE_TIME',
                            },
                            _type: 'ELEMENT',
                            archetype_node_id: 'at0034',
                          },
                        ],
                        archetype_details: [
                          {
                            value: {
                              rm_version: '1.0.1',
                              archetype_id: {
                                value: 'openEHR-EHR-CLUSTER.specimen.v1',
                              },
                              _type: 'ARCHETYPED',
                            },
                          },
                        ],
                        archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                      },
                      {
                        name: {
                          value: 'Test-Panel',
                          _type: 'DV_TEXT',
                        },
                        _type: 'CLUSTER',
                        archetype_details: [
                          {
                            value: {
                              rm_version: '1.0.1',
                              archetype_id: {
                                value: 'openEHR-EHR-CLUSTER.laboratory_test_panel.v0',
                              },
                              _type: 'ARCHETYPED',
                            },
                          },
                        ],
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_panel.v0',
                        items: [
                          {
                            name: {
                              value: 'Pro Virus',
                              _type: 'DV_TEXT',
                            },
                            _type: 'CLUSTER',
                            items: [
                              {
                                name: {
                                  value: 'Zugehörige Laborprobe',
                                  _type: 'DV_TEXT',
                                },
                                value: {
                                  id: '12',
                                  type: '12',
                                  issuer: '12',
                                  assigner: '12',
                                  _type: 'DV_IDENTIFIER',
                                },
                                _type: 'ELEMENT',
                                archetype_node_id: 'at0026',
                              },
                            ],
                            archetype_details: [
                              {
                                value: {
                                  rm_version: '1.0.1',
                                  archetype_id: {
                                    value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                                  },
                                  _type: 'ARCHETYPED',
                                },
                              },
                            ],
                            archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                          },
                        ],
                      },
                    ],
                  },
                  archetype_node_id: 'at0002',
                },
              ],
              _type: 'HISTORY',
            },
            archetype_details: {
              value: {
                rm_version: '1.0.1',
                archetype_id: {
                  value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
                },
              },
              _type: 'ARCHETYPED',
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
          },
        ],
      },
    ],
    [
      {
        uid: {
          _type: 'OBJECT_VERSION_ID',
          value: '8bf78561-0fe1-4789-a1de-85b5510b16a7::local.ehrbase.org::1',
        },
        name: {
          _type: 'DV_TEXT',
        },
        _type: 'COMPOSITION',
        context: {
          _type: 'EVENT_CONTEXT',
          setting: {
            _type: 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              _type: 'CODE_PHRASE',
              code_string: '238',
              terminology_id: {
                _type: 'TERMINOLOGY_ID',
                value: 'openehr',
              },
            },
          },
          start_time: {
            _type: 'DV_DATE_TIME',
            value: '2020-05-04T14:36:55+02:00',
          },
          health_care_facility: {
            name: 'string',
            _type: 'PARTY_IDENTIFIED',
            external_ref: {
              id: {
                _type: 'GENERIC_ID',
                value: '123',
                scheme: 'string',
              },
              _type: 'PARTY_REF',
              namespace: 'string',
            },
          },
        },
        category: {
          _type: 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            _type: 'CODE_PHRASE',
            code_string: '433',
            terminology_id: {
              _type: 'TERMINOLOGY_ID',
              value: 'openehr',
            },
          },
        },
        composer: {
          name: 'name',
          _type: 'PARTY_IDENTIFIED',
          external_ref: {
            id: {
              _type: 'GENERIC_ID',
              value: '123',
              scheme: 'scheme',
            },
            type: 'ANY',
            _type: 'PARTY_REF',
            namespace: 'MHH',
          },
        },
        language: {
          _type: 'CODE_PHRASE',
          code_string: 'de',
          terminology_id: {
            _type: 'TERMINOLOGY_ID',
            value: 'ISO_639-1',
          },
        },
        territory: {
          _type: 'CODE_PHRASE',
          code_string: 'DE',
          terminology_id: {
            _type: 'TERMINOLOGY_ID',
            value: 'ISO_3166-1',
          },
        },
        archetype_details: {
          _type: 'ARCHETYPED',
          rm_version: '1.0.4',
          template_id: {
            _type: 'TEMPLATE_ID',
            value: 'Virologischer Befund',
          },
          archetype_id: {
            _type: 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.report-result.v1',
          },
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.report-result.v1',
        content: [
          {
            name: {
              value: 'Befund',
              _type: 'DV_TEXT',
            },
            _type: 'OBSERVATION',
            subject: {
              _type: 'PARTY_SELF',
            },
            encoding: {
              code_string: 'UTF-8',
              terminology_id: {
                name: 'IANA_character-sets',
                value: 'IANA_character-sets',
              },
            },
            language: {
              code_string: 'de',
              terminology_id: {
                name: 'ISO_639-1',
                value: 'ISO_639-1',
              },
            },
            data: {
              name: {
                value: 'Event Series',
                _type: 'DV_TEXT',
              },
              origin: {
                value: '2020-05-04T14:36:55.915+02:00',
                _type: 'DV_DATE_TIME',
              },
              archetype_node_id: 'at0001',
              events: [
                {
                  name: {
                    value: 'Jedes Ereignis',
                    _type: 'DV_TEXT',
                  },
                  time: {
                    value: '2020-05-04T14:36:55.915+02:00',
                    _type: 'DV_DATE_TIME',
                  },
                  _type: 'POINT_EVENT',
                  data: {
                    name: {
                      value: 'Tree',
                      _type: 'DV_TEXT',
                    },
                    archetype_node_id: 'at0003',
                    _type: 'ITEM_TREE',
                    items: [
                      {
                        name: {
                          value: 'Probe',
                          _type: 'DV_TEXT',
                        },
                        _type: 'CLUSTER',
                        items: [
                          {
                            name: {
                              value: 'Zeitpunkt des Probeneingangs',
                              _type: 'DV_TEXT',
                            },
                            value: {
                              value: '2020-05-03T00:00+02:00',
                              epoch_offset: 1.5884568e9,
                              _type: 'DV_DATE_TIME',
                            },
                            _type: 'ELEMENT',
                            archetype_node_id: 'at0034',
                          },
                        ],
                        archetype_details: [
                          {
                            value: {
                              rm_version: '1.0.1',
                              archetype_id: {
                                value: 'openEHR-EHR-CLUSTER.specimen.v1',
                              },
                              _type: 'ARCHETYPED',
                            },
                          },
                        ],
                        archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                      },
                      {
                        name: {
                          value: 'Test-Panel',
                          _type: 'DV_TEXT',
                        },
                        _type: 'CLUSTER',
                        archetype_details: [
                          {
                            value: {
                              rm_version: '1.0.1',
                              archetype_id: {
                                value: 'openEHR-EHR-CLUSTER.laboratory_test_panel.v0',
                              },
                              _type: 'ARCHETYPED',
                            },
                          },
                        ],
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_panel.v0',
                        items: [
                          {
                            name: {
                              value: 'Pro Virus',
                              _type: 'DV_TEXT',
                            },
                            _type: 'CLUSTER',
                            items: [
                              {
                                name: {
                                  value: 'Zugehörige Laborprobe',
                                  _type: 'DV_TEXT',
                                },
                                value: {
                                  id: '12',
                                  type: '12',
                                  issuer: '12',
                                  assigner: '12',
                                  _type: 'DV_IDENTIFIER',
                                },
                                _type: 'ELEMENT',
                                archetype_node_id: 'at0026',
                              },
                            ],
                            archetype_details: [
                              {
                                value: {
                                  rm_version: '1.0.1',
                                  archetype_id: {
                                    value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                                  },
                                  _type: 'ARCHETYPED',
                                },
                              },
                            ],
                            archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                          },
                        ],
                      },
                    ],
                  },
                  archetype_node_id: 'at0002',
                },
              ],
              _type: 'HISTORY',
            },
            archetype_details: {
              value: {
                rm_version: '1.0.1',
                archetype_id: {
                  value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
                },
              },
              _type: 'ARCHETYPED',
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
          },
        ],
      },
      {
        uid: {
          _type: 'OBJECT_VERSION_ID',
          value: '8bf78561-0fe1-4789-a1de-85b5510b16a7::local.ehrbase.org::1',
        },
        name: {
          _type: 'DV_TEXT',
        },
        _type: 'COMPOSITION',
        context: {
          _type: 'EVENT_CONTEXT',
          setting: {
            _type: 'DV_CODED_TEXT',
            value: 'other care',
            defining_code: {
              _type: 'CODE_PHRASE',
              code_string: '238',
              terminology_id: {
                _type: 'TERMINOLOGY_ID',
                value: 'openehr',
              },
            },
          },
          start_time: {
            _type: 'DV_DATE_TIME',
            value: '2020-05-04T14:36:55+02:00',
          },
          health_care_facility: {
            name: 'string',
            _type: 'PARTY_IDENTIFIED',
            external_ref: {
              id: {
                _type: 'GENERIC_ID',
                value: '123',
                scheme: 'string',
              },
              _type: 'PARTY_REF',
              namespace: 'string',
            },
          },
        },
        category: {
          _type: 'DV_CODED_TEXT',
          value: 'event',
          defining_code: {
            _type: 'CODE_PHRASE',
            code_string: '433',
            terminology_id: {
              _type: 'TERMINOLOGY_ID',
              value: 'openehr',
            },
          },
        },
        composer: {
          name: 'name',
          _type: 'PARTY_IDENTIFIED',
          external_ref: {
            id: {
              _type: 'GENERIC_ID',
              value: '123',
              scheme: 'scheme',
            },
            type: 'ANY',
            _type: 'PARTY_REF',
            namespace: 'MHH',
          },
        },
        language: {
          _type: 'CODE_PHRASE',
          code_string: 'de',
          terminology_id: {
            _type: 'TERMINOLOGY_ID',
            value: 'ISO_639-1',
          },
        },
        territory: {
          _type: 'CODE_PHRASE',
          code_string: 'DE',
          terminology_id: {
            _type: 'TERMINOLOGY_ID',
            value: 'ISO_3166-1',
          },
        },
        archetype_details: {
          _type: 'ARCHETYPED',
          rm_version: '1.0.4',
          template_id: {
            _type: 'TEMPLATE_ID',
            value: 'Virologischer Befund',
          },
          archetype_id: {
            _type: 'ARCHETYPE_ID',
            value: 'openEHR-EHR-COMPOSITION.report-result.v1',
          },
        },
        archetype_node_id: 'openEHR-EHR-COMPOSITION.report-result.v1',
        content: [
          {
            name: {
              value: 'Befund',
              _type: 'DV_TEXT',
            },
            _type: 'OBSERVATION',
            subject: {
              _type: 'PARTY_SELF',
            },
            encoding: {
              code_string: 'UTF-8',
              terminology_id: {
                name: 'IANA_character-sets',
                value: 'IANA_character-sets',
              },
            },
            language: {
              code_string: 'de',
              terminology_id: {
                name: 'ISO_639-1',
                value: 'ISO_639-1',
              },
            },
            data: {
              name: {
                value: 'Event Series',
                _type: 'DV_TEXT',
              },
              origin: {
                value: '2020-05-04T14:36:55.915+02:00',
                _type: 'DV_DATE_TIME',
              },
              archetype_node_id: 'at0001',
              events: [
                {
                  name: {
                    value: 'Jedes Ereignis',
                    _type: 'DV_TEXT',
                  },
                  time: {
                    value: '2020-05-04T14:36:55.915+02:00',
                    _type: 'DV_DATE_TIME',
                  },
                  _type: 'POINT_EVENT',
                  data: {
                    name: {
                      value: 'Tree',
                      _type: 'DV_TEXT',
                    },
                    archetype_node_id: 'at0003',
                    _type: 'ITEM_TREE',
                    items: [
                      {
                        name: {
                          value: 'Probe',
                          _type: 'DV_TEXT',
                        },
                        _type: 'CLUSTER',
                        items: [
                          {
                            name: {
                              value: 'Zeitpunkt des Probeneingangs',
                              _type: 'DV_TEXT',
                            },
                            value: {
                              value: '2020-05-03T00:00+02:00',
                              epoch_offset: 1.5884568e9,
                              _type: 'DV_DATE_TIME',
                            },
                            _type: 'ELEMENT',
                            archetype_node_id: 'at0034',
                          },
                        ],
                        archetype_details: [
                          {
                            value: {
                              rm_version: '1.0.1',
                              archetype_id: {
                                value: 'openEHR-EHR-CLUSTER.specimen.v1',
                              },
                              _type: 'ARCHETYPED',
                            },
                          },
                        ],
                        archetype_node_id: 'openEHR-EHR-CLUSTER.specimen.v1',
                      },
                      {
                        name: {
                          value: 'Test-Panel',
                          _type: 'DV_TEXT',
                        },
                        _type: 'CLUSTER',
                        archetype_details: [
                          {
                            value: {
                              rm_version: '1.0.1',
                              archetype_id: {
                                value: 'openEHR-EHR-CLUSTER.laboratory_test_panel.v0',
                              },
                              _type: 'ARCHETYPED',
                            },
                          },
                        ],
                        archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_panel.v0',
                        items: [
                          {
                            name: {
                              value: 'Pro Virus',
                              _type: 'DV_TEXT',
                            },
                            _type: 'CLUSTER',
                            items: [
                              {
                                name: {
                                  value: 'Zugehörige Laborprobe',
                                  _type: 'DV_TEXT',
                                },
                                value: {
                                  id: '12',
                                  type: '12',
                                  issuer: '12',
                                  assigner: '12',
                                  _type: 'DV_IDENTIFIER',
                                },
                                _type: 'ELEMENT',
                                archetype_node_id: 'at0026',
                              },
                            ],
                            archetype_details: [
                              {
                                value: {
                                  rm_version: '1.0.1',
                                  archetype_id: {
                                    value: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                                  },
                                  _type: 'ARCHETYPED',
                                },
                              },
                            ],
                            archetype_node_id: 'openEHR-EHR-CLUSTER.laboratory_test_analyte.v1',
                          },
                        ],
                      },
                    ],
                  },
                  archetype_node_id: 'at0002',
                },
              ],
              _type: 'HISTORY',
            },
            archetype_details: {
              value: {
                rm_version: '1.0.1',
                archetype_id: {
                  value: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
                },
              },
              _type: 'ARCHETYPED',
            },
            archetype_node_id: 'openEHR-EHR-OBSERVATION.laboratory_test_result.v1',
          },
        ],
      },
    ],
  ],
}
