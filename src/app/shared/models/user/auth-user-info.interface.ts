import { UserInfo } from 'angular-oauth2-oidc'

export interface IAuthUserInfo extends UserInfo {
  groups?: string[]
}
