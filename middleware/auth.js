const config = require("config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-auth-token"];
    if (!token) return res.status(401).send(`No token provided!`);

    jwt.verify(token, config.get("jwtPrivateKey"), (err, decode) => {
        if (err) return res.status(400).send(`Invalid token.`);

        req.user = _.pick(decode, "id", "role");
        next();
    });
};

module.exports = verifyToken;
