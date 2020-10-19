const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports.getAllPlayers = async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ["password"] },
    });
    res.send(users);
};

module.exports.getIndividualPlayer = async (req, res) => {
    const _id = req.params.id;
    const user = await User.findOne({
        where: { id: _id },
        attributes: { exclude: ["password"] },
    });
    res.send(user);
};

module.exports.createPlayer = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        const message = `Please fill the name, email, and password`;
        return res.status(400).send(message);
    }

    try {
        let user = await User.findOne({ where: { email: req.body.email } });
        if (user) return res.status(400).send("User already registered");

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            password: await bcrypt.hash(req.body.password, 12),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send("Successfully register new account");
    } catch (err) {
        console.log(err);
    }
};
