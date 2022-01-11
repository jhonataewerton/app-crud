var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var departamentSchema = new Schema(
  {
    name: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Product", departamentSchema);
