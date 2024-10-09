import eslint from '@eslint/js';
import ts_eslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default ts_eslint.config(
  {
    //config with just ignores is the replacement for  '.eslintignore'
    ignores: ['**/dist/**', '**/dist.js/**', 'coverage', 'docker'],
  },

// Turns off all rules that unneccessary or might conflicT with the prettier run 

{
  
}

);