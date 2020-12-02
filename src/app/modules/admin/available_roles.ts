import { IRoleI18n } from 'src/app/shared/models/admin/role.interface'

export const available_roles: IRoleI18n[] = [
  {
    id: '1',
    name: {
      en: 'Researcher',
      de: 'Wissenschaftler',
    },
  },
  {
    id: '2',
    name: {
      en: 'Study Coordinator',
      de: 'Studienkoordinator',
    },
  },
  {
    id: '3',
    name: {
      en: 'Organization Admin',
      de: 'Organisations-Administrator',
    },
  },
]
