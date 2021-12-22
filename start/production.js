const cors = require("cors");
function Production(app) {
  app.use(cors());
}

module.exports = Production;
