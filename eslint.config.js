import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'app.js', 'styles.css', '*.config.js', '*.config.ts'] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        Event: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/restrict-template-expressions': 'off',
      // 防止 XSS 反模式回流：禁止賦值 innerHTML / outerHTML。
      // 唯一合法出口是 src/lib/dom.ts 的 mount()，該行以行內 disable 放行。
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "AssignmentExpression[left.property.name=/^(inner|outer)HTML$/]",
          message: '禁止直接寫入 innerHTML/outerHTML；請改用 lib/html.ts 的 html`` 搭配 mount()。',
        },
      ],
    },
  },
  prettier,
);
