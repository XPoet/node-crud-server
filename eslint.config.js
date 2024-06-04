import pluginJs from '@eslint/js'
import pluginPrettier from 'eslint-plugin-prettier/recommended'

export default [
  pluginJs.configs.recommended,
  pluginPrettier,
  {
    rules: {},
    languageOptions: {
      globals: {
        console: true,
        require: true,
        module: true,
        process: true,
        exports: true
      }
    },
    // ignore files
    ignores: ['.git', '.vscode', '.idea', '.husky', 'node_modules', 'dist']
  }
]
