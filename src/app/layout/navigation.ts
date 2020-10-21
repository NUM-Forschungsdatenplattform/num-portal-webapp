import INavItem from './models/nav-item.interface';

export const mainNavItems: INavItem[] = [
  {
    routeTo: 'home',
    icon: 'th',
    translationKey: 'NAVIGATION.DASHBOARD',
  },
  {
    routeTo: 'studies',
    icon: 'microscope',
    translationKey: 'NAVIGATION.STUDIES',
  },
  {
    routeTo: 'phenotypes',
    icon: 'seedling',
    translationKey: 'NAVIGATION.PHENOTYPES',
    tabNav: [
      {
        routeTo: 'phenotypes',
        translationKey: 'NAVIGATION.PHENOTYPES_OVERVIEW',
      },
      {
        routeTo: 'phenotypes/editor',
        translationKey: 'NAVIGATION.PHENOTYPES_EDITOR',
      },
    ]
  },
  {
    routeTo: 'cohorts',
    icon: 'cubes',
    translationKey: 'NAVIGATION.COHORTS',
  },
];

export const secondaryNavItems: INavItem[] = [
  {
    routeTo: '#',
    icon: 'bell',
    translationKey: 'NAVIGATION.NOTIFICATIONS',
  },
  {
    routeTo: '#',
    icon: 'cog',
    translationKey: 'NAVIGATION.PROFILE',
  },
  {
    routeTo: '#',
    icon: 'sign-out-alt',
    translationKey: 'NAVIGATION.SIGNOUT',
  },
];
