const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Msg = require("../models/msg");
const Notification = require("../models/notification");

const msg = new Msg();
const notificacao = new Notification(true);

const router = express.Router();

router.route("/").get((_req, res) => {
    res.render("pages/doc", {
        title: msg.titleDoc,
        subtitle: msg.sutitleDoc,
        notificacao: notificacao,
    });
});

module.exports = router;
