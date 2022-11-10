module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            babelrc: false,
            configFile: false,
        },
    },
    plugins: ['@typescript-eslint'],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off'
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
};
