module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended", 
        "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
    ],
    "rules": {
       "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "semi": ["error", "always"],
    "prefer-const": "error",
    "eqeqeq": ["error", "always"],
    "curly": ["error"],
    "no-console": "error"
    }
};
