import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' }); // First look at .env.local file
dotenv.config({ path: '.env' }); // Then look at .env file and any params that exist in .env.local will be **NOT** overwritten

const GQL_ENDPOINT =
  process.env.API_URL || 'https://portal.dev.digitalu.teambespin.us/graphql';

// NOTE: you must add `BEARER_TOKEN="Bearer abc123"` to .env file
const authorizationValue: string = process.env.BEARER_TOKEN as string;

const config: CodegenConfig = {
  schema: [
    {
      [GQL_ENDPOINT]: {
        headers: {
          Authorization: authorizationValue
        }
      }
    }
  ],
  documents: ['src/**/*.ts', '!src/**/*.test.tsx', '!src/generated/graphql.ts'],
  generates: {
    'src/api/codegen/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: false
      }
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    }
  }
};

export default config;
