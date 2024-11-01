import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    //config with just ignores is the replacement for  '.eslintignore'
    ignores: ['**/dist/**', '**/dist.js/**', 'coverage', 'docker'],
  },

// Turns off all rules that unnecessary or might conflict with the prettier run 
eslint.configs.recommended,

// recommended eslint config
eslint.configs.recommended,

// strict: a superset of recommended that includes more opinionated rules which may also catch bugs.
...tseslint.configs.strict,

// stylistic: additional rules that enforce consistent styling without significantly catching bugs or changing logic.
...tseslint.configs.stylistic,
);