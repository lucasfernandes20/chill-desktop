import nx from '@nx/eslint-plugin';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  {
    ignores: ['**/dist', '**/node_modules', '**/tmp'],
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

  // Usando as configurações do NX Angular
  ...nx.configs['flat/angular'],

  // Aplica as configurações do Prettier (deve ser o último para sobrescrever regras conflitantes)
  prettier,
];
