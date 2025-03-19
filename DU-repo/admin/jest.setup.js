/* eslint import/no-unassigned-import: "off" */
// Enables additional testing tools without a
//  repetitious file-level import
import '@testing-library/jest-dom';

require('dotenv').config();

global.fetch = require('node-fetch');

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    apiUrl: 'https://foo.bar',
    jHubUrl: 'https://foo.bar'
  }
}));

const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: array => crypto.randomBytes(array.length),
    randomUUID: () => crypto.randomBytes(16).toString('hex')
  }
});

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  }
});

process.env.KEYCLOAK_URL = 'https://foo.bar';
process.env.NEXTAUTH_URL = 'https://foo.bar';
