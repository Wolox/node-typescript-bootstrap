module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "project": './tsconfig.json',
    "tsconfigRootDir": __dirname,
    "createDefaultProgram": true
  },
  "plugins": [
    "@typescript-eslint/tslint"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "wolox-node"
  ],
  globals: {
    __DEV__: true
  },
  rules: {
    "@typescript-eslint/array-type": "array",
    "@typescript-eslint/class-name-casing": ["error", { "allowUnderscorePrefix": true }],
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/explicit-function-return-type": ["error"],
    "@typescript-eslint/interface-name-prefix": 0,
    "func-call-spacing": "off",
    "@typescript-eslint/func-call-spacing": ["error"],
    "@typescript-eslint/func-call-spacing": ["error"],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-empty-interface": ["error", { "allowSingleExtends": false }],
    "no-extra-parens": "off",
    "@typescript-eslint/no-extra-parens": [
      "error",
      "all",
      {
        ignoreJSX: "all",
        enforceForArrowConditionals: false,
        returnAssign: false
      }
    ],
    "@typescript-eslint/no-extraneous-class": ["error"],
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-misused-promises": ["error"],
    '@typescript-eslint/no-this-alias': ['error',{ allowDestructuring: true }],
    "no-useless-constructor": "error",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-readonly": ["error"],
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/unbound-method": [ "error"],
    "@typescript-eslint/no-explicit-any": ["error", { "ignoreRestArgs": true }],
    "@typescript-eslint/camelcase": "off"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js"]
      }
    }
  }
};
