const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
function Production(app) {
  app.use(cors());
  app.use(helmet());
  app.use(compression());
}

module.exports = Production;
