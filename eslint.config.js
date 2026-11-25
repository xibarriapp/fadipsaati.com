import eslintPluginAstro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/', 'migration/'] },
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: { parser: tsParser },
  },
];
