const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var router = express.Router();
const Msg = require("../models/msg");
const UserSchema = require("../models/user");

const msg = new Msg();
const padrao = mongoose.model("User", UserSchema);

router
    .route("/")
    .get((_req, res) => {
        padrao.find((error, elementos) => {
            if (error)
                res.render("pages/error", {
                    title: msg.titleData,
                    subtitle: msg.titleData,
                    error: error,
                });

            res.render("pages/data", {
                title: msg.titleData,
                nicknameResult:
                    "__________________________________________________________________",
                data: elementos,
            });
        });
    });

router
    .route("/search?:nickname")
    .get((req, res) => {
        padrao.find((error, elementos) => {
            if (error)
                res.render("pages/error", {
                    title: msg.titleData,
                    subtitle: msg.titleData,
                    error: error,
                });

            res.render("pages/data", {
                title: msg.titleResults,
                nicknameResult: req.query.nickname,
                data: elementos,
            });
        });
    });

    module.exports = router;