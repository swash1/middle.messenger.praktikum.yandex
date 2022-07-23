module.exports = {
    "parser": "@babel/eslint-parser",
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          // your babel options
          // presets: ["@babel/preset-env"],
        },
    },
    "extends": [
        "airbnb-base",
        "prettier"
    ]
}