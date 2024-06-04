export interface IArchetypeQueryBuilderResponse {
  /**
   * The query string
   */

  q: string
  /**
   * The map of parameters specified in the builder request
   */
  parameters: {
    [x: string]: string
  }
}
