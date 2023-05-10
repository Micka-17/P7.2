"use strict";
const DataTypes = require("sequelize");
const User = require('./user');
const sequelize = require("../models/connexion");

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const Post = sequelize.define('Post', {
  // Model attributes are defined here
  User_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    required: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    required: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    required: false,
  },
  comment: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  }
});

Post.belongsTo(User, {
  as: "user",
  foreignKey: "User_Id"
});
User.hasMany(Post, {
  as: "posts"
})

/* (async () => {
  await sequelize.sync({ force: true });
  // Code here
})(); */

//Post.sync({ force: true })

console.log(Post === sequelize.models.Post);

module.exports = Post;