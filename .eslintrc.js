const paths = require("./config/paths");

module.exports = {
  parser: "babel-eslint",

  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true,
    jest: true,
    mocha: true,
  },
  extends: ["airbnb", "plugin:react/recommended", "prettier", "prettier/react"],
  plugins: ["babel", "security", "prettier"],
  settings: {
    "import/resolver": {
      node: {
        paths: paths.resolveModules,
      },
    },
  },
  rules: {
    "import/named": 0,
    "import/no-unassigned-import": 0,
    "import/no-named-as-default-member": 0,
    "import/prefer-default-export": 0,
    "prettier/prettier": "error",
    "react/prop-types": 0,
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "import/no-extraneous-dependencies": ["warn"],
    "react/no-danger": 0,
    "no-param-reassign": 0,
  },
};
