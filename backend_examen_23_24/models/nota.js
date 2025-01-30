const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nota', {
    idnota: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    texto: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    fcreacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    urlimagen: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'notas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idnota" },
        ]
      },
    ]
  });
};
