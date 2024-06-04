/**
 * Generates a random number between 0 and maxValue as a integer id value. Uses {@link Math.random}
 * for generation.
 *
 * @param maxValue - Maximum random value
 * @returns - Random number between 0 and maxValue.
 */
export const generateRandomId = (maxValue = 1_000) => {
  return Math.random() * maxValue
}
