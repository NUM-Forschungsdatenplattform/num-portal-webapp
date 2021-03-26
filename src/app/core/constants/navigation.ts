import INavItem from '../../layout/models/nav-item.interface'

export const mainNavItems: INavItem[] = [
  {
    routeTo: 'home',
    icon: 'num-welcome',
    translationKey: 'NAVIGATION.DASHBOARD',
  },
  {
    routeTo: 'projects',
    icon: 'microscope',
    translationKey: 'NAVIGATION.PROJECTS',
    tabNav: [
      {
        routeTo: 'projects',
        id: 'overview',
        translationKey: 'NAVIGATION.PROJECTS_OVERVIEW',
      },
      {
        routeTo: 'projects/new/editor',
        id: 'editor',
        translationKey: 'NAVIGATION.PROJECTS_EDITOR',
      },
    ],
  },
  {
    routeTo: 'data-explorer',
    icon: 'table',
    translationKey: 'NAVIGATION.DATA_RETRIEVAL',
    tabNav: [
      {
        routeTo: 'data-explorer/projects',
        id: 'overview',
        translationKey: 'NAVIGATION.PROJECTS_OVERVIEW',
      },
      {
        routeTo: 'data-explorer',
        id: 'data-explorer',
        translationKey: 'NAVIGATION.DATA_RETRIEVAL',
        disabled: true,
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
    routeTo: 'aqls',
    icon: 'dna',
    translationKey: 'NAVIGATION.AQLS',
    tabNav: [
      {
        routeTo: 'aqls',
        id: 'overview',
        translationKey: 'NAVIGATION.AQLS_OVERVIEW',
      },
      {
        routeTo: 'aqls/new/editor',
        id: 'editor',
        translationKey: 'NAVIGATION.AQLS_EDITOR',
      },
    ],
  },
  {
    routeTo: 'users',
    icon: 'user-edit',
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
  {
    routeTo: 'organizations',
    icon: 'building',
    translationKey: 'NAVIGATION.ORGANIZATION_MANAGEMENT',
    tabNav: [
      {
        routeTo: 'organizations',
        id: 'overview',
        translationKey: 'NAVIGATION.ALL_ORGANIZATIONS',
      },
      {
        routeTo: 'organizations/new/editor',
        id: 'editor',
        translationKey: 'NAVIGATION.ORGANIZATION_EDITOR',
      },
    ],
  },
  {
    routeTo: 'content-editor',
    icon: ['far', 'newspaper'],
    translationKey: 'NAVIGATION.CONTENT_EDITOR',
    tabNav: [
      {
        routeTo: 'content-editor',
        id: 'welcome-page',
        translationKey: 'NAVIGATION.CONTENT_EDITOR_WELCOME_PAGE',
      },
      {
        routeTo: 'content-editor/navigation-items',
        id: 'navigation-items',
        translationKey: 'NAVIGATION.CONTENT_EDITOR_NAVIGATION_ITEMS',
      },
    ],
  },
]

export const secondaryNavItemsLoggedIn: INavItem[] = [
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
