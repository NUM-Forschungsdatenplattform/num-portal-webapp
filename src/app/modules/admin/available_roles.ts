import { IRoleUi } from 'src/app/shared/models/user/role-ui.interface'

export const available_roles: IRoleUi[] = [
  {
    id: 'RESEARCHER',
    name: {
      en: 'Researcher',
      de: 'Wissenschaftler',
    },
  },
  {
    id: 'STUDY_COORDINATOR',
    name: {
      en: 'Study Coordinator',
      de: 'Studienkoordinator',
    },
  },
  {
    id: 'ORGANIZATION_ADMIN',
    name: {
      en: 'Organization Admin',
      de: 'Organisations-Administrator',
    },
  },
]
