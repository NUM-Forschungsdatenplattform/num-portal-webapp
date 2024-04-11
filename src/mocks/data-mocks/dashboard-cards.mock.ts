import { IDashboardCard } from 'src/app/shared/models/content/dashboard-card.interface'

export const mockDashboardCards: IDashboardCard[] = [
  {
    imageId: 'CODEX',
    url: 'https://www.google.de/a-longer-link/test/this',
    de: {
      title: 'German Title 1',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
    en: {
      title: 'English Title 1',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
  },
  {
    imageId: 'INFORMATION',
    url: 'https://www.google.de',
    de: {
      title: 'German Title 2',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
    en: {
      title: 'English Title 2',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
  },
  {
    imageId: 'NEWS',
    url: 'https://www.google.de',
    de: {
      title: 'German Title 3',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
    en: {
      title: 'English Title 3',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    },
  },
]
