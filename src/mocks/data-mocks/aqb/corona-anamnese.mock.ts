import { ReferenceModelType } from 'src/app/shared/models/archetype-query-builder/referencemodel-type.enum'
import { IContainmentNode } from 'src/app/shared/models/archetype-query-builder/template/containment-node.interface'

export const mockCoronaAnamnese: IContainmentNode = {
  children: [
    {
      children: [],
      fields: [
        {
          name: 'Geschichte::value',
          rmType: ReferenceModelType.String,
          aqlPath: '/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/value',
          humanReadablePath: 'bericht/geschichte_historie/beliebiges_ereignis/geschichte/value',
        },
        {
          name: 'time::value',
          rmType: ReferenceModelType.Temporal_accessor,
          aqlPath: '/data[at0001]/events[at0002]/time/value',
          humanReadablePath: 'bericht/geschichte_historie/beliebiges_ereignis/time/value',
        },
        {
          name: 'subject',
          rmType: ReferenceModelType.Party_proxy,
          aqlPath: '/subject',
          humanReadablePath: 'bericht/geschichte_historie/subject',
        },
        {
          name: 'language',
          rmType: ReferenceModelType.Code_phrase,
          aqlPath: '/language',
          humanReadablePath: 'bericht/geschichte_historie/language',
        },
        {
          name: 'encoding',
          rmType: ReferenceModelType.Code_phrase,
          aqlPath: '/encoding',
          humanReadablePath: 'bericht/geschichte_historie/encoding',
        },
      ],
      archetypeId: 'openEHR-EHR-OBSERVATION.story.v1',
    },
    {
      children: [
        {
          children: [],
          fields: [
            {
              name: 'Bezeichnung des Symptoms oder Anzeichens.::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0004]/value/value',
              humanReadablePath:
                'bericht/symptome/husten/spezifisches_symptom_anzeichen/bezeichnung_des_symptoms_oder_anzeichens./value',
            },
            {
              name: 'Vorhanden?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0005]/value/defining_code',
              humanReadablePath:
                'bericht/symptome/husten/spezifisches_symptom_anzeichen/vorhanden/defining_code',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath: 'bericht/symptome/husten/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/symptome/husten/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/symptome/husten/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/symptome/husten/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0',
        },
        {
          children: [],
          fields: [
            {
              name: 'Bezeichnung des Symptoms oder Anzeichens.::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0004]/value/value',
              humanReadablePath:
                'bericht/symptome/schnupfen/spezifisches_symptom_anzeichen/bezeichnung_des_symptoms_oder_anzeichens./value',
            },
            {
              name: 'Vorhanden?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0005]/value/defining_code',
              humanReadablePath:
                'bericht/symptome/schnupfen/spezifisches_symptom_anzeichen/vorhanden/defining_code',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath: 'bericht/symptome/schnupfen/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/symptome/schnupfen/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/symptome/schnupfen/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/symptome/schnupfen/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0',
        },
        {
          children: [],
          fields: [
            {
              name: 'Bezeichnung des Symptoms oder Anzeichens.::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0004]/value/value',
              humanReadablePath:
                'bericht/symptome/heiserkeit/spezifisches_symptom_anzeichen/bezeichnung_des_symptoms_oder_anzeichens./value',
            },
            {
              name: 'Vorhanden?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0005]/value/defining_code',
              humanReadablePath:
                'bericht/symptome/heiserkeit/spezifisches_symptom_anzeichen/vorhanden/defining_code',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath: 'bericht/symptome/heiserkeit/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/symptome/heiserkeit/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/symptome/heiserkeit/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/symptome/heiserkeit/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0',
        },
        {
          children: [],
          fields: [
            {
              name: 'Bezeichnung des Symptoms oder Anzeichens.::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0004]/value/value',
              humanReadablePath:
                'bericht/symptome/fieber_oder_erhöhte_körpertemperatur/spezifisches_symptom_anzeichen/bezeichnung_des_symptoms_oder_anzeichens./value',
            },
            {
              name: 'Vorhanden?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0005]/value/defining_code',
              humanReadablePath:
                'bericht/symptome/fieber_oder_erhöhte_körpertemperatur/spezifisches_symptom_anzeichen/vorhanden/defining_code',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath: 'bericht/symptome/fieber_oder_erhöhte_körpertemperatur/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/symptome/fieber_oder_erhöhte_körpertemperatur/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/symptome/fieber_oder_erhöhte_körpertemperatur/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/symptome/fieber_oder_erhöhte_körpertemperatur/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0',
        },
        {
          children: [],
          fields: [
            {
              name: 'Temperatur::magnitude',
              rmType: ReferenceModelType.Double,
              aqlPath: '/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude',
              humanReadablePath: 'bericht/symptome/körpertemperatur/temperatur/magnitude',
            },
            {
              name: 'Temperatur::units',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/units',
              humanReadablePath: 'bericht/symptome/körpertemperatur/temperatur/units',
            },
            {
              name: 'Störfaktoren::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0002]/events[at0003]/state[at0029]/items[at0066]/value/value',
              humanReadablePath: 'bericht/symptome/körpertemperatur/störfaktoren/value',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0002]/events[at0003]/time/value',
              humanReadablePath: 'bericht/symptome/körpertemperatur/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/symptome/körpertemperatur/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/symptome/körpertemperatur/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/symptome/körpertemperatur/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.body_temperature.v2',
        },
        {
          children: [],
          fields: [
            {
              name: 'Bezeichnung des Symptoms oder Anzeichens.::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0004]/value/value',
              humanReadablePath:
                'bericht/symptome/gestörter_geruchssinn/spezifisches_symptom_anzeichen/bezeichnung_des_symptoms_oder_anzeichens./value',
            },
            {
              name: 'Vorhanden?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0005]/value/defining_code',
              humanReadablePath:
                'bericht/symptome/gestörter_geruchssinn/spezifisches_symptom_anzeichen/vorhanden/defining_code',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath: 'bericht/symptome/gestörter_geruchssinn/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/symptome/gestörter_geruchssinn/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/symptome/gestörter_geruchssinn/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/symptome/gestörter_geruchssinn/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0',
        },
        {
          children: [],
          fields: [
            {
              name: 'Bezeichnung des Symptoms oder Anzeichens.::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0004]/value/value',
              humanReadablePath:
                'bericht/symptome/gestörter_geschmackssinn/spezifisches_symptom_anzeichen/bezeichnung_des_symptoms_oder_anzeichens./value',
            },
            {
              name: 'Vorhanden?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0005]/value/defining_code',
              humanReadablePath:
                'bericht/symptome/gestörter_geschmackssinn/spezifisches_symptom_anzeichen/vorhanden/defining_code',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath: 'bericht/symptome/gestörter_geschmackssinn/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/symptome/gestörter_geschmackssinn/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/symptome/gestörter_geschmackssinn/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/symptome/gestörter_geschmackssinn/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0',
        },
        {
          children: [],
          fields: [
            {
              name: 'Bezeichnung des Symptoms oder Anzeichens.::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0004]/value/value',
              humanReadablePath:
                'bericht/symptome/durchfall/spezifisches_symptom_anzeichen/bezeichnung_des_symptoms_oder_anzeichens./value',
            },
            {
              name: 'Vorhanden?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0005]/value/defining_code',
              humanReadablePath:
                'bericht/symptome/durchfall/spezifisches_symptom_anzeichen/vorhanden/defining_code',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath: 'bericht/symptome/durchfall/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/symptome/durchfall/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/symptome/durchfall/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/symptome/durchfall/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0',
        },
        {
          children: [],
          fields: [
            {
              name: 'Bezeichnung des Symptoms oder Anzeichens.::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0004]/value/value',
              humanReadablePath:
                'bericht/symptome/weitere_symptome/beliebiges_ereignis/spezifisches_symptom_anzeichen/bezeichnung_des_symptoms_oder_anzeichens./value',
            },
            {
              name: 'Vorhanden?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0005]/value/defining_code',
              humanReadablePath:
                'bericht/symptome/weitere_symptome/beliebiges_ereignis/spezifisches_symptom_anzeichen/vorhanden/defining_code',
            },
            {
              name: 'Kommentar::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0035]/value/value',
              humanReadablePath:
                'bericht/symptome/weitere_symptome/beliebiges_ereignis/spezifisches_symptom_anzeichen/kommentar/value',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath: 'bericht/symptome/weitere_symptome/beliebiges_ereignis/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/symptome/weitere_symptome/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/symptome/weitere_symptome/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/symptome/weitere_symptome/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0',
        },
      ],
      fields: [],
      archetypeId: 'openEHR-EHR-SECTION.adhoc.v1',
    },
    {
      children: [
        {
          children: [],
          fields: [
            {
              name: '*Agent (en)::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0001]/events[at0002]/data[at0042]/items[at0043]/value/value',
              humanReadablePath: 'bericht/kontakt/personenkontakt/agent_en/value',
            },
            {
              name: '*Presence of any exposure? (en)::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0042]/items[at0057]/value/defining_code',
              humanReadablePath:
                'bericht/kontakt/personenkontakt/presence_of_any_exposure_en/defining_code',
            },
            {
              name: '*Exposure (en)::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0042]/items[at0044]/items[at0045]/value/value',
              humanReadablePath:
                'bericht/kontakt/personenkontakt/specific_exposure_en/exposure_en/value',
            },
            {
              name: 'Vorhandensein::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0042]/items[at0044]/items[at0046]/value/defining_code',
              humanReadablePath:
                'bericht/kontakt/personenkontakt/specific_exposure_en/vorhandensein/defining_code',
            },
            {
              name: 'Kommentar::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0001]/events[at0002]/data[at0042]/items[at0055]/value/value',
              humanReadablePath: 'bericht/kontakt/personenkontakt/kommentar/value',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath: 'bericht/kontakt/personenkontakt/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/kontakt/personenkontakt/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/kontakt/personenkontakt/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/kontakt/personenkontakt/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.exposure_assessment.v0',
        },
        {
          children: [],
          fields: [
            {
              name: '*Agent (en)::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0001]/events[at0002]/data[at0042]/items[at0043]/value/value',
              humanReadablePath:
                'bericht/kontakt/aufenthalt_in_gesundheitseinrichtung/agent_en/value',
            },
            {
              name: '*Presence of any exposure? (en)::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0042]/items[at0057]/value/defining_code',
              humanReadablePath:
                'bericht/kontakt/aufenthalt_in_gesundheitseinrichtung/presence_of_any_exposure_en/defining_code',
            },
            {
              name: '*Exposure (en)::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0042]/items[at0044]/items[at0045]/value/value',
              humanReadablePath:
                'bericht/kontakt/aufenthalt_in_gesundheitseinrichtung/specific_exposure_en/exposure_en/value',
            },
            {
              name: 'Vorhandensein::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0042]/items[at0044]/items[at0046]/value/defining_code',
              humanReadablePath:
                'bericht/kontakt/aufenthalt_in_gesundheitseinrichtung/specific_exposure_en/vorhandensein/defining_code',
            },
            {
              name: 'Kommentar::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0001]/events[at0002]/data[at0042]/items[at0055]/value/value',
              humanReadablePath:
                'bericht/kontakt/aufenthalt_in_gesundheitseinrichtung/kommentar/value',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath: 'bericht/kontakt/aufenthalt_in_gesundheitseinrichtung/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/kontakt/aufenthalt_in_gesundheitseinrichtung/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/kontakt/aufenthalt_in_gesundheitseinrichtung/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/kontakt/aufenthalt_in_gesundheitseinrichtung/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.exposure_assessment.v0',
        },
      ],
      fields: [],
      archetypeId: 'openEHR-EHR-SECTION.adhoc.v1',
    },
    {
      children: [
        {
          children: [
            {
              children: [],
              fields: [
                {
                  name: 'Standortbeschreibung::value',
                  rmType: ReferenceModelType.String,
                  aqlPath: '/items[at0046]/value/value',
                  humanReadablePath:
                    'bericht/risikogebiet/historie_der_reise/ortsbeschreibung/standort/standortbeschreibung/value',
                },
              ],
              archetypeId: 'openEHR-EHR-CLUSTER.location.v1',
            },
          ],
          fields: [
            {
              name:
                'Aufenthalt in den letzten 14 Tage in einem der Risikogebiete für Coronainfektion oder Kontakt zu Menschen, die dort waren::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0111]/value/defining_code',
              humanReadablePath:
                'bericht/risikogebiet/historie_der_reise/aufenthalt_in_den_letzten_14_tage_in_einem_der_risikogebiete_für_coronainfektion_oder_kontakt_zu_menschen_die_dort_waren/defining_code',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath: 'bericht/risikogebiet/historie_der_reise/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/risikogebiet/historie_der_reise/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/risikogebiet/historie_der_reise/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/risikogebiet/historie_der_reise/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.travel_history.v0',
        },
        {
          children: [],
          fields: [
            {
              name: 'Letzte Reise?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/defining_code',
              humanReadablePath:
                'bericht/risikogebiet/reisefall/beliebiges_intervallereignis/letzte_reise/defining_code',
            },
            {
              name: 'Inland/Ausland::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0026]/value/defining_code',
              humanReadablePath:
                'bericht/risikogebiet/reisefall/beliebiges_intervallereignis/inland_ausland/defining_code',
            },
            {
              name: 'Land::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0008]/items[at0010]/items[at0011]/value/value',
              humanReadablePath:
                'bericht/risikogebiet/reisefall/beliebiges_intervallereignis/bestimmte_reise/bestimmtes_reiseziel/land/value',
            },
            {
              name: 'Bundesland / Region::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0008]/items[at0010]/items[at0012]/value/value',
              humanReadablePath:
                'bericht/risikogebiet/reisefall/beliebiges_intervallereignis/bestimmte_reise/bestimmtes_reiseziel/bundesland_region/value',
            },
            {
              name: 'Stadt::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0008]/items[at0010]/items[at0013]/value/value',
              humanReadablePath:
                'bericht/risikogebiet/reisefall/beliebiges_intervallereignis/bestimmte_reise/bestimmtes_reiseziel/stadt/value',
            },
            {
              name: 'Bestimmte Gegend::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0008]/items[at0010]/items[at0031]/value/value',
              humanReadablePath:
                'bericht/risikogebiet/reisefall/beliebiges_intervallereignis/bestimmte_reise/bestimmtes_reiseziel/bestimmte_gegend/value',
            },
            {
              name: 'Rückreisedatum::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0008]/items[at0019]/value/value',
              humanReadablePath:
                'bericht/risikogebiet/reisefall/beliebiges_intervallereignis/bestimmte_reise/rückreisedatum/value',
            },
            {
              name: 'math_function::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/data[at0001]/events[at0002]/math_function/defining_code',
              humanReadablePath:
                'bericht/risikogebiet/reisefall/beliebiges_intervallereignis/math_function/defining_code',
            },
            {
              name: 'width::value',
              rmType: ReferenceModelType.Temporal_amount,
              aqlPath: '/data[at0001]/events[at0002]/width/value',
              humanReadablePath:
                'bericht/risikogebiet/reisefall/beliebiges_intervallereignis/width/value',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath:
                'bericht/risikogebiet/reisefall/beliebiges_intervallereignis/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/risikogebiet/reisefall/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/risikogebiet/reisefall/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/risikogebiet/reisefall/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.travel_event.v0',
        },
      ],
      fields: [],
      archetypeId: 'openEHR-EHR-SECTION.adhoc.v1',
    },
    {
      children: [
        {
          children: [],
          fields: [
            {
              name: 'Bezeichnung des Symptoms oder Anzeichens.::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0004]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/andere_aktuelle_erkrankungen/spezifisches_symptom_anzeichen/bezeichnung_des_symptoms_oder_anzeichens./value',
            },
            {
              name: 'Vorhanden?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0005]/value/defining_code',
              humanReadablePath:
                'bericht/allgemeine_angaben/andere_aktuelle_erkrankungen/spezifisches_symptom_anzeichen/vorhanden/defining_code',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/andere_aktuelle_erkrankungen/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/allgemeine_angaben/andere_aktuelle_erkrankungen/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/allgemeine_angaben/andere_aktuelle_erkrankungen/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/allgemeine_angaben/andere_aktuelle_erkrankungen/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0',
        },
        {
          children: [],
          fields: [
            {
              name: 'Bezeichnung des Symptoms oder Anzeichens.::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0004]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/chronische_erkrankungen/spezifisches_symptom_anzeichen/bezeichnung_des_symptoms_oder_anzeichens./value',
            },
            {
              name: 'Vorhanden?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0001]/events[at0002]/data[at0003]/items[at0022]/items[at0005]/value/defining_code',
              humanReadablePath:
                'bericht/allgemeine_angaben/chronische_erkrankungen/spezifisches_symptom_anzeichen/vorhanden/defining_code',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0001]/events[at0002]/time/value',
              humanReadablePath: 'bericht/allgemeine_angaben/chronische_erkrankungen/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/allgemeine_angaben/chronische_erkrankungen/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/allgemeine_angaben/chronische_erkrankungen/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/allgemeine_angaben/chronische_erkrankungen/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.symptom_sign_screening.v0',
        },
        {
          children: [],
          fields: [
            {
              name: 'Name des Problems/ der Diagnose::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0001]/items[at0002]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/problem_diagnose/name_des_problems_der_diagnose/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/allgemeine_angaben/problem_diagnose/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/allgemeine_angaben/problem_diagnose/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/allgemeine_angaben/problem_diagnose/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-EVALUATION.problem_diagnosis.v1',
        },
        {
          children: [],
          fields: [
            {
              name: 'Medikamente in Verwendung?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0022]/events[at0023]/data[at0001]/items[at0027]/value/defining_code',
              humanReadablePath:
                'bericht/allgemeine_angaben/fragebogen_zum_medikations-screening/medikamente_in_verwendung/defining_code',
            },
            {
              name: 'Name der Medikamentenklasse::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0022]/events[at0023]/data[at0001]/items[at0026]/items[at0002]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/fragebogen_zum_medikations-screening/spezifische_medikamentenklasse/name_der_medikamentenklasse/value',
            },
            {
              name: 'Medikamentenklasse in Verwendung?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0022]/events[at0023]/data[at0001]/items[at0026]/items[at0003]/value/defining_code',
              humanReadablePath:
                'bericht/allgemeine_angaben/fragebogen_zum_medikations-screening/spezifische_medikamentenklasse/medikamentenklasse_in_verwendung/defining_code',
            },
            {
              name: 'Name des Medikaments::value',
              rmType: ReferenceModelType.String,
              aqlPath:
                '/data[at0022]/events[at0023]/data[at0001]/items[at0026]/items[at0008]/items[at0021]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/fragebogen_zum_medikations-screening/spezifische_medikamentenklasse/spezifische_medikamente/name_des_medikaments/value',
            },
            {
              name: 'Medikament in Verwendung?::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath:
                '/data[at0022]/events[at0023]/data[at0001]/items[at0026]/items[at0008]/items[at0024]/value/defining_code',
              humanReadablePath:
                'bericht/allgemeine_angaben/fragebogen_zum_medikations-screening/spezifische_medikamentenklasse/spezifische_medikamente/medikament_in_verwendung/defining_code',
            },
            {
              name: 'time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/data[at0022]/events[at0023]/time/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/fragebogen_zum_medikations-screening/time/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath:
                'bericht/allgemeine_angaben/fragebogen_zum_medikations-screening/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath:
                'bericht/allgemeine_angaben/fragebogen_zum_medikations-screening/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath:
                'bericht/allgemeine_angaben/fragebogen_zum_medikations-screening/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-OBSERVATION.medication_use.v0',
        },
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      children: [],
                      fields: [
                        {
                          name: 'Stadt::value',
                          rmType: ReferenceModelType.String,
                          aqlPath: '/items[at0012]/value/value',
                          humanReadablePath:
                            'bericht/allgemeine_angaben/gesundheitsbezogener_beruf/beschäftigung/organisation/adresse/stadt/value',
                        },
                        {
                          name: 'Land::value',
                          rmType: ReferenceModelType.String,
                          aqlPath: '/items[at0015]/value/value',
                          humanReadablePath:
                            'bericht/allgemeine_angaben/gesundheitsbezogener_beruf/beschäftigung/organisation/adresse/land/value',
                        },
                      ],
                      archetypeId: 'openEHR-EHR-CLUSTER.address_cc.v0',
                    },
                  ],
                  fields: [
                    {
                      name: 'Name der Einrichtung::value',
                      rmType: ReferenceModelType.String,
                      aqlPath: '/items[at0012]/value/value',
                      humanReadablePath:
                        'bericht/allgemeine_angaben/gesundheitsbezogener_beruf/beschäftigung/organisation/name_der_einrichtung/value',
                    },
                  ],
                  archetypeId: 'openEHR-EHR-CLUSTER.organisation_cc.v0',
                },
              ],
              fields: [
                {
                  name: 'Berufsbezeichnung/Rolle::value',
                  rmType: ReferenceModelType.String,
                  aqlPath: '/items[at0005]/value/value',
                  humanReadablePath:
                    'bericht/allgemeine_angaben/gesundheitsbezogener_beruf/beschäftigung/berufsbezeichnung_rolle/value',
                },
              ],
              archetypeId: 'openEHR-EHR-CLUSTER.occupation_record.v1',
            },
          ],
          fields: [
            {
              name: 'Beschäftigungsstatus::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0001]/items[at0004]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/gesundheitsbezogener_beruf/beschäftigungsstatus/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/allgemeine_angaben/gesundheitsbezogener_beruf/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/allgemeine_angaben/gesundheitsbezogener_beruf/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/allgemeine_angaben/gesundheitsbezogener_beruf/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-EVALUATION.occupation_summary.v1',
        },
        {
          children: [
            {
              children: [],
              fields: [
                {
                  name: 'Anzahl der Schlafzimmer::magnitude',
                  rmType: ReferenceModelType.Long,
                  aqlPath: '/items[at0028]/value/magnitude',
                  humanReadablePath:
                    'bericht/allgemeine_angaben/wohnsituation/wohnstätte/anzahl_der_schlafzimmer/magnitude',
                },
              ],
              archetypeId: 'openEHR-EHR-CLUSTER.dwelling.v0',
            },
          ],
          fields: [
            {
              name: 'Beschreibung::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0001]/items[at0003]/value/value',
              humanReadablePath: 'bericht/allgemeine_angaben/wohnsituation/beschreibung/value',
            },
            {
              name: 'Anzahl der Haushaltsmitglieder::magnitude',
              rmType: ReferenceModelType.Long,
              aqlPath: '/data[at0001]/items[at0007]/value/magnitude',
              humanReadablePath:
                'bericht/allgemeine_angaben/wohnsituation/anzahl_der_haushaltsmitglieder/magnitude',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/allgemeine_angaben/wohnsituation/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/allgemeine_angaben/wohnsituation/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/allgemeine_angaben/wohnsituation/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-EVALUATION.living_arrangement.v0',
        },
        {
          children: [],
          fields: [
            {
              name: 'Gesundheitsrisiko::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0001]/items[at0002]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/bewertung_des_gesundheitsrisikos/gesundheitsrisiko/value',
            },
            {
              name: 'Risikofaktor::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0001]/items[at0016]/items[at0013]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/bewertung_des_gesundheitsrisikos/spezifischer_risikofaktor/risikofaktor/value',
            },
            {
              name: 'Vorhandensein::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/data[at0001]/items[at0016]/items[at0017]/value/defining_code',
              humanReadablePath:
                'bericht/allgemeine_angaben/bewertung_des_gesundheitsrisikos/spezifischer_risikofaktor/vorhandensein/defining_code',
            },
            {
              name: 'Risikofaktor::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0001]/items[at0016]/items[at0013]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/bewertung_des_gesundheitsrisikos/andere_risikofaktoren/risikofaktor/value',
            },
            {
              name: 'Vorhandensein::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/data[at0001]/items[at0016]/items[at0017]/value/defining_code',
              humanReadablePath:
                'bericht/allgemeine_angaben/bewertung_des_gesundheitsrisikos/andere_risikofaktoren/vorhandensein/defining_code',
            },
            {
              name: 'Risikobewertung::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0001]/items[at0003]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/bewertung_des_gesundheitsrisikos/risikobewertung/value',
            },
            {
              name: 'Letzte Aktualisierung::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/protocol[at0010]/items[at0024]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/bewertung_des_gesundheitsrisikos/letzte_aktualisierung/value',
            },
            {
              name: 'Bewertungsmethode::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/protocol[at0010]/items[at0025]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/bewertung_des_gesundheitsrisikos/bewertungsmethode/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath:
                'bericht/allgemeine_angaben/bewertung_des_gesundheitsrisikos/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath:
                'bericht/allgemeine_angaben/bewertung_des_gesundheitsrisikos/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath:
                'bericht/allgemeine_angaben/bewertung_des_gesundheitsrisikos/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-EVALUATION.health_risk.v1',
        },
        {
          children: [
            {
              children: [],
              fields: [
                {
                  name: 'Diagnosestatus::defining_code',
                  rmType: ReferenceModelType.Code_phrase,
                  aqlPath: '/items[at0004]/value/defining_code',
                  humanReadablePath:
                    'bericht/allgemeine_angaben/problem_diganose_coronovirus/status/diagnosestatus/defining_code',
                },
              ],
              archetypeId: 'openEHR-EHR-CLUSTER.problem_qualifier.v1',
            },
          ],
          fields: [
            {
              name: 'Name des Problems/ der Diagnose::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0001]/items[at0002]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/problem_diganose_coronovirus/name_des_problems_der_diagnose/value',
            },
            {
              name: 'Diagnostische Sicherheit::defining_code',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/data[at0001]/items[at0073]/value/defining_code',
              humanReadablePath:
                'bericht/allgemeine_angaben/problem_diganose_coronovirus/diagnostische_sicherheit/defining_code',
            },
            {
              name: 'Kommentar::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/data[at0001]/items[at0069]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/problem_diganose_coronovirus/kommentar/value',
            },
            {
              name: 'Zuletzt aktualisiert::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/protocol[at0032]/items[at0070]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/problem_diganose_coronovirus/zuletzt_aktualisiert/value',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/allgemeine_angaben/problem_diganose_coronovirus/subject',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/allgemeine_angaben/problem_diganose_coronovirus/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/allgemeine_angaben/problem_diganose_coronovirus/encoding',
            },
          ],
          archetypeId: 'openEHR-EHR-EVALUATION.problem_diagnosis_covid.v1',
        },
        {
          children: [],
          fields: [
            {
              name: 'Name der Dienstleistung::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/activities[at0001]/description[at0009]/items[at0121]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/dienstleistung/aktuelle_aktivität/name_der_dienstleistung/value',
            },
            {
              name: 'Grund für die Anforderung::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/activities[at0001]/description[at0009]/items[at0062]/value/value',
              humanReadablePath:
                'bericht/allgemeine_angaben/dienstleistung/aktuelle_aktivität/grund_für_die_anforderung/value',
            },
            {
              name: 'timing',
              rmType: ReferenceModelType.Dv_parsable,
              aqlPath: '/activities[at0001]/timing',
              humanReadablePath:
                'bericht/allgemeine_angaben/dienstleistung/aktuelle_aktivität/timing',
            },
            {
              name: 'subject',
              rmType: ReferenceModelType.Party_proxy,
              aqlPath: '/subject',
              humanReadablePath: 'bericht/allgemeine_angaben/dienstleistung/subject',
            },
            {
              name: 'narrative::value',
              rmType: ReferenceModelType.String,
              aqlPath: '/narrative/value',
              humanReadablePath: 'bericht/allgemeine_angaben/dienstleistung/narrative/value',
            },
            {
              name: 'language',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/language',
              humanReadablePath: 'bericht/allgemeine_angaben/dienstleistung/language',
            },
            {
              name: 'encoding',
              rmType: ReferenceModelType.Code_phrase,
              aqlPath: '/encoding',
              humanReadablePath: 'bericht/allgemeine_angaben/dienstleistung/encoding',
            },
            {
              name: 'expiry_time::value',
              rmType: ReferenceModelType.Temporal_accessor,
              aqlPath: '/expiry_time/value',
              humanReadablePath: 'bericht/allgemeine_angaben/dienstleistung/expiry_time/value',
            },
          ],
          archetypeId: 'openEHR-EHR-INSTRUCTION.service_request.v1',
        },
      ],
      fields: [],
      archetypeId: 'openEHR-EHR-SECTION.adhoc.v1',
    },
  ],
  fields: [
    {
      name: 'Bericht ID::value',
      rmType: ReferenceModelType.String,
      aqlPath: '/context/other_context[at0001]/items[at0002]/value/value',
      humanReadablePath: 'bericht/context/bericht_id/value',
    },
    {
      name: 'Status::value',
      rmType: ReferenceModelType.String,
      aqlPath: '/context/other_context[at0001]/items[at0005]/value/value',
      humanReadablePath: 'bericht/context/status/value',
    },
    {
      name: 'start_time::value',
      rmType: ReferenceModelType.Temporal_accessor,
      aqlPath: '/context/start_time/value',
      humanReadablePath: 'bericht/context/start_time/value',
    },
    {
      name: 'end_time::value',
      rmType: ReferenceModelType.Temporal_accessor,
      aqlPath: '/context/end_time/value',
      humanReadablePath: 'bericht/context/end_time/value',
    },
    {
      name: 'health_care_facility',
      rmType: ReferenceModelType.Party_identified,
      aqlPath: '/context/health_care_facility',
      humanReadablePath: 'bericht/context/health_care_facility',
    },
    {
      name: 'setting::defining_code',
      rmType: ReferenceModelType.Code_phrase,
      aqlPath: '/context/setting/defining_code',
      humanReadablePath: 'bericht/context/setting/defining_code',
    },
    {
      name: 'composer',
      rmType: ReferenceModelType.Party_proxy,
      aqlPath: '/composer',
      humanReadablePath: 'bericht/composer',
    },
    {
      name: 'language',
      rmType: ReferenceModelType.Code_phrase,
      aqlPath: '/language',
      humanReadablePath: 'bericht/language',
    },
    {
      name: 'category::defining_code',
      rmType: ReferenceModelType.Code_phrase,
      aqlPath: '/category/defining_code',
      humanReadablePath: 'bericht/category/defining_code',
    },
    {
      name: 'territory',
      rmType: ReferenceModelType.Code_phrase,
      aqlPath: '/territory',
      humanReadablePath: 'bericht/territory',
    },
  ],
  archetypeId: 'openEHR-EHR-COMPOSITION.report.v1',
}
