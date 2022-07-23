module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            babelrc: false,
            configFile: false,
            // your babel options
            // presets: ["@babel/preset-env"],
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
