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
        'import/prefer-default-export': 'off',
        'sort-imports': [
            'error',
            {
                ignoreCase: false,
                ignoreDeclarationSort: false,
                ignoreMemberSort: false,
                allowSeparatedGroups: true,
                memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
            },
        ],
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts'],
            },
        },
        'import/order': [1, { groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'] }],
    },
    extends: ['plugin:@typescript-eslint/recommended', 'airbnb-base', 'prettier'],
};
