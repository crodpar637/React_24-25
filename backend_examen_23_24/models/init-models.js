var DataTypes = require("sequelize").DataTypes;
var _nota = require("./nota");

function initModels(sequelize) {
  var nota = _nota(sequelize, DataTypes);


  return {
    nota,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
