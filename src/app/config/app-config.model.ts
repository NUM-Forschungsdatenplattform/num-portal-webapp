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
  }
  aqlEditor: {
    baseUrl: string
  }
  legal: {
    version: string
    copyrightOwner: string
  }
}
