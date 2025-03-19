import { defineConfig } from '@pandacss/dev';
import pandaPreset from '@pandacss/preset-panda';
import { cerberusPreset, cerberusConfig } from '@cerberus/panda-preset';

export default defineConfig({
  ...cerberusConfig,

  include: [
    './node_modules/@cerberus/react/src/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  exclude: [],

  presets: [pandaPreset, cerberusPreset],
  outExtension: 'js'
});
