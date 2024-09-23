/* eslint-env node */

import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

export default [
    js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        files: ['**/*.js', '**/*.vue'],
        rules: {
            'indent': 'off',
            'vue/html-indent': 'off',
            'vue/html-closing-bracket-newline': [
                'error',
                {
                    singleline: 'never',
                    multiline: 'never'
                }
            ],
            'vue/multi-word-component-names': 'off',
            'vue/html-closing-bracket-spacing': [
                'error',
                {
                    selfClosingTag: 'always'
                }
            ],
            'vue/no-v-html': 'off',
            'vue/no-v-text-v-html-on-component': ['error', { allow: ['perfect-scrollbar'] }],
            'no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    caughtErrors: 'all',
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_'
                }
            ]
        }
    }
    // {
    //     ignores: ["**/Renderer/**/*.js", "**/svg-pan-zoom.js"],
    // }
];
