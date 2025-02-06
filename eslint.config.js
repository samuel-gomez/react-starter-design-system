import pluginJs from '@eslint/js';
import a11yPlugin from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import pluginReactHook from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  pluginJs.configs.recommended,
  a11yPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginPrettier,
  {
    plugins: {
      'react-hooks': pluginReactHook,
    },
    rules: {
      ...pluginReactHook.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 0,
      'react/jsx-props-no-spreading': 0,
      'react/require-default-props': 'off',
      'react/display-name': 'off',

      'react/jsx-no-useless-fragment': [
        'warn',
        {
          allowExpressions: true,
        },
      ],

      'import/no-extraneous-dependencies': [
        'off',
        {
          devDependencies: true,
        },
      ],

      'no-restricted-exports': 'off',
      'react/function-component-definition': 'off',

      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'enum',
          format: ['PascalCase', 'UPPER_CASE', 'camelCase'],
        },
      ],
    },
  },
];
