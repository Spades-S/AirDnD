module.exports = {
    'env': {
        'browser': true,
        'node': true,
        'commonjs': true,
        'es6': true,
        'browser': true
    },
    'extends': 'airbnb-base',
    'plugins': ['html'],
    'rules': {
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        'linebreak-style': [
            'off'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'off'
        ],
        'comma-dangle': [
            'error',
            {
                'objects': 'never'
            }
        ],
        'no-plusplus': [
            'off'
        ],
        'no-param-reassign': [
            'off'
        ],
        'import/no-unresolved': [
            'off'
        ],
        "global-require": "off",
        "import/no-dynamic-require": "off"
    }
}