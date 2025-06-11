import baseConfig from '../../../eslint.config.mjs';
import { rules } from 'eslint-plugin-ngrx';

export default [
  ...baseConfig,
  {
    rules: {
      ...rules,
      'no-unused-vars': 'off',
    },
  },
];
