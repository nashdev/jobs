const paths = require("../paths");

module.exports = {
  extensions: [".js", ".mjs", ".json", ".jsx", ".css"],
  modules: paths.resolveModules,
  alias: {
    data: paths.data,
    shared: paths.srcShared,
  },
};
