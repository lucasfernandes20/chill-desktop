import nx from '@nx/eslint-plugin';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import angularEslint from '@angular-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import angularTemplateParser from '@angular-eslint/template-parser';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  {
    ignores: ['**/dist', '**/node_modules', '**/tmp', '.cache/', '.git/', '.node_modules/'],
  },

  // Configuração básica para TypeScript e JavaScript
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.base.json'],
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@nx': nx,
      '@typescript-eslint': typescriptEslint,
      '@angular-eslint': angularEslint,
      prettier: prettierPlugin,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
      // Aplica as regras recomendadas do TypeScript ESLint
      ...typescriptEslint.configs.recommended.rules,
      // Regras gerais recomendadas
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'prefer-const': 'warn',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'arrow-body-style': ['warn', 'as-needed'],
      'no-duplicate-imports': 'error',
    },
  },

  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint': angularEslint,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error', { parser: 'angular' }],
    },
  },

  ...nx.configs['flat/angular'],

  eslintPluginPrettierRecommended,
];
