const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Msg = require("../public/js/msg");
const Notification = require("../public/js/notification");

const msg = new Msg();
const notificacao = new Notification(true);

const router = express.Router();

router.route("/").get((_req, res) => {
    res.render("pages/doc", {
        title: msg.titleDoc,
        subtitle: msg.sutitleDoc,
        notificacao: notificacao,
    });
    console.log("GET -> /doc ✅");
});

module.exports = router;
