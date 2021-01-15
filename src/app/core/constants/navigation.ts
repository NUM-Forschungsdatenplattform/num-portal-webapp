import INavItem from '../../layout/models/nav-item.interface'

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
    tabNav: [
      {
        routeTo: 'studies',
        id: 'overview',
        translationKey: 'NAVIGATION.STUDIES_OVERVIEW',
      },
      {
        routeTo: 'studies/new/editor',
        id: 'editor',
        translationKey: 'NAVIGATION.STUDIES_EDITOR',
      },
    ],
  },
  {
    routeTo: 'phenotypes',
    icon: 'cubes',
    translationKey: 'NAVIGATION.PHENOTYPES',
    tabNav: [
      {
        routeTo: 'phenotypes',
        id: 'overview',
        translationKey: 'NAVIGATION.PHENOTYPES_OVERVIEW',
      },
      {
        routeTo: 'phenotypes/new/editor',
        id: 'editor',
        translationKey: 'NAVIGATION.PHENOTYPES_EDITOR',
      },
    ],
  },
  {
    routeTo: 'cohorts',
    icon: 'cubes',
    translationKey: 'NAVIGATION.COHORTS',
  },
  {
    routeTo: 'aqls',
    icon: 'dna',
    translationKey: 'NAVIGATION.AQLS',
  },
  {
    routeTo: 'users',
    icon: 'users-cog',
    translationKey: 'NAVIGATION.USER_MANAGEMENT',
    tabNav: [
      {
        routeTo: 'users',
        id: 'unapproved',
        translationKey: 'NAVIGATION.NEW_USERS',
      },
      {
        routeTo: 'users/all',
        id: 'approved',
        translationKey: 'NAVIGATION.ALL_USERS',
      },
    ],
  },
]

export const secondaryNavItemsLoggedIn: INavItem[] = [
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
    routeTo: '#logout',
    icon: 'sign-out-alt',
    translationKey: 'NAVIGATION.SIGNOUT',
  },
]

export const secondaryNavItemsLoggedOut: INavItem[] = [
  {
    routeTo: '#login',
    icon: 'sign-in-alt',
    translationKey: 'NAVIGATION.SIGNIN',
  },
]
