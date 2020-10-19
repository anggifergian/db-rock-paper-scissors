const _ = require("lodash");
const { User, Match } = require("../models");

module.exports.playGame = async (req, res) => {
    const _idPlayer = req.body.id;
    if (!_idPlayer) return res.status(400).send("Id player required");

    const roomId = req.body.roomId;
    if (!roomId) return res.status(400).send("Room Id required");

    const user = await User.findByPk(_idPlayer);

    res.send(_.pick(user, "id"));
};

module.exports.createRoom = async (req, res) => {
    if (!req.body.id) return res.status(400).send("Id player required");

    const user = await User.findOne({ where: { id: req.body.id } });

    let match = await Match.findAll({ where: { isOpen: true } });

    if (!match || match.length === 0) {
        match = await Match.create({
            createdBy: user.id,
        });
    }

    res.send(match);
};

module.exports.getAllRooms = async (req, res) => {
    const match = await Match.findAll();
    res.send(match);
};

module.exports.deleteRoom = async (req, res) => {
    if (!req.params.id) return res.status(400).send(`Room id is required.`);

    await Match.destroy({ where: { id: req.params.id } });
    res.send(`Room with id ${req.params.id} has been deleted.`);
};
