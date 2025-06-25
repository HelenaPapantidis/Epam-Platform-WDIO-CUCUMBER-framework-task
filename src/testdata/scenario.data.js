import 'dotenv/config'
/**
 * Scenario credentials data mapped by scenario tag.
 * @type {Object.<string, {username: string, password: string}>}
 */
if (!process.env.USERNAME || !process.env.PASSWORD) {
  throw new Error('Environment variables USERNAME and PASSWORD must be set.');
}

export const scenarioData = {
  '@UC-1': { username: 'anyName', password: 'anyPassword' },
  '@UC-2': { username: 'anyName', password: '' },
  '@UC-3': { username: process.env.LOGIN, password: process.env.PASSWORD },
};

/**
 * Retrieves credentials for a given scenario tag.
 * @param {string} tagName - Scenario tag name (e.g., "@UC-1").
 * @returns {{username: string, password: string}} Credentials for the scenario.
 * @throws {Error} If credentials are not found for the tag.
 */
export function getCredentials(tagName) {
  const credentials = scenarioData[tagName];
  if (!credentials) {
    throw new Error(`No credentials found for scenario tag: ${tagName}`);
  }
  return credentials;
}