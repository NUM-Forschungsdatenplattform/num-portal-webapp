export interface IAqlValidationResponse {
  valid: boolean
  message: string
  startLine: number
  startColumn: number
  error: string
}
