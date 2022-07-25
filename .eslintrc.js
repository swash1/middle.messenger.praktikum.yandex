module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            babelrc: false,
            configFile: false,
        },
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        'import/prefer-default-export': 'off',
    },
    extends: ['airbnb-base', 'prettier'],
};
