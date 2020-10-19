"use strict";
const { Model } = require("sequelize");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
        }
        generateAuthToken = () => {
            const payload = {
                id: this.id,
                name: this.name,
                email: this.email,
                role: this.role,
            };
            return jwt.sign(payload, config.get("jwtPrivateKey"));
        };
    }
    User.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: {
                type: DataTypes.STRING,
                defaultValue: "player",
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
