/**
 * Helper interface for dictionary-like types
 */

export type IDictionary<K extends string | number, V> = {
  [Key in K]: V
}
