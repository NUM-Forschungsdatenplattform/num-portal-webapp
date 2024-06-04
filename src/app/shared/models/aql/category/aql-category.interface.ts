/**
 * AQL category data model from backend API
 */
export interface IAqlCategoryApi {
  /**
   * Backend id for this category
   */
  id: number
  /**
   * Name strings for the category for each language. Must provide the name in German
   * ('de') and English ('en') language.
   */
  name: {
    de: string
    en: string
  }
}
