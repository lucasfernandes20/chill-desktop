import baseConfig from '../../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    rules: {
      'no-unused-vars': 'off',
    },
  },
];
