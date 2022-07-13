const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Post', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    body: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Post_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
