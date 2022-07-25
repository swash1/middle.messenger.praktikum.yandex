module.exports = {
    plugins: ['stylelint-order', 'stylelint-config-rational-order/plugin'],
    rules: {
        'plugin/rational-order': [
            true,
            {
                'border-in-box-model': false,
                'empty-line-between-groups': true,
            },
        ],
        indentation: 4,
        'at-rule-no-unknown': [true, { ignoreAtRules: ['include', 'mixin'] }],
        'block-opening-brace-newline-before': 'always',
    },
    extends: ['stylelint-config-rational-order', 'stylelint-config-prettier'],
};
