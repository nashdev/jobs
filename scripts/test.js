/*! © CREATE-REACT-APP */

// Do this as the first thing so that any code reading it knows the right env.
Object.assign(process.env, {
  BABEL_ENV: "test",
  NODE_ENV: "test",
});

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

const jest = require("jest");

const argv = process.argv.slice(2);

jest.run(argv);
