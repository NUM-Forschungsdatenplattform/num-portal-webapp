import { IOrganizationUi } from 'src/app/shared/models/user/organization-ui.interface'

export const availableOrganizations: IOrganizationUi[] = [
  {
    id: 'Hannover',
    name: {
      de: 'Medizinische Hochschule Hannover',
      en: 'Hannover Medical School',
    },
  },
  {
    id: 'Göttingen',
    name: {
      de: 'Universitätsmedizin Göttingen',
      en: 'University Medical Center Göttingen',
    },
  },
  {
    id: 'Berlin',
    name: {
      de: 'Charité – Universitätsmedizin Berlin',
      en: 'Charité – Universitätsmedizin Berlin',
    },
  },
  {
    id: 'Aachen',
    name: {
      de: 'Uniklinik RWTH Aachen',
      en: 'Uniklinik RWTH Aachen',
    },
  },
  {
    id: 'Erlangen',
    name: {
      de: 'Universitätsklinikum Erlangen',
      en: 'Universitätsklinikum Erlangen',
    },
  },
  {
    id: 'Heidelberg',
    name: {
      de: 'Universitätsklinikum Heidelberg',
      en: 'Heidelberg University Hospital',
    },
  },
]
