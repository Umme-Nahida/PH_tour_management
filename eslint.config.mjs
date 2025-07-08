// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    {
        rules: {
            "no-console": "error"
            // Note: you must disable the base rule as it can report incorrect errors
            // "no-unused-vars": "off",
            // "@typescript-eslint/no-unused-vars": "error"
        }
    }
);