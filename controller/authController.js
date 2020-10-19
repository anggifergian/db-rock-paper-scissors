const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send(`Email or password required!`);
    }

    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send(`Invalid email or password`);

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send(`Invalid email or password`);

    const token = user.generateAuthToken();
    user = _.omit(user.dataValues, ["password"]);
    res.send({ ...user, token: token });
};

module.exports.whoami = async (req, res) => {
    res.send(req.user);
};
