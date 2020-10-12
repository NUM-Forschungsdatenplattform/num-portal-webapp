export interface IAppConfig {
    env: {
        name: string
    };
    api: {
        url: string
    };
    auth: {
        baseUrl: string,
        realm: string,
        clientId: string
    };
}
