export interface IAppConfig {
  env: {
    name: string
  }
  api: {
    baseUrl: string
  }
  auth: {
    baseUrl: string
    realm: string
    clientId: string
    redirectProfileUrl: string
  }
  legal: {
    copyrightOwner: string
  }
  welcomePageTitle: {
    de: string
    en: string
  }
}
