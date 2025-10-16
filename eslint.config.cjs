const simpleImportSort = require('eslint-plugin-simple-import-sort');
const importPlugin = require('eslint-plugin-import');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
	{
		ignores: ['**/dist', '**/.react-router'],
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		plugins: {
			'simple-import-sort': simpleImportSort,
			import: importPlugin,
			'@typescript-eslint': tsPlugin,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		// Override or add rules here
		rules: {
			...tsPlugin.configs.recommended.rules,
			'no-console': ['warn', { allow: ['warn', 'error', 'info', 'time', 'timeEnd'] }],
			semi: ['error', 'always'],
			'import/no-duplicates': 'error',
			curly: ['error', 'all'],
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// Side effect imports
						['^\\u0000'],
						// packages starting with a character
						['^@?\\w'],
						// Packages starting with `~`
						['^~'],
						// Imports starting with `../`
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						// Imports starting with `./`
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
						// Style imports
						['^.+\\.s?css$'],
					],
				},
			],
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
		},
	},
	eslintPluginPrettierRecommended,
];
