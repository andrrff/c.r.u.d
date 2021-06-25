const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const UserSchema = require("../models/user");
const padrao = mongoose.model("Users", UserSchema);
const Msg = require("../models/msg");

const msg = new Msg();

const router = express.Router();


router
    .route("/data/:produto_id")
    .delete((req, res) => {
        // Removendo por parametro no caso o ID
        padrao.remove(
            {
                _id: req.params.produto_id,
            },
            (error) => {
                if (error)
                    res.render("pages/error", {
                        title: msg.titleError,
                        subtitle: msg.subtitleError,
                        error: error,
                    });
                
                router.route("/");
                res.render("pages/actionPage", { title: msg.deleted });
            }
        );
    });

module.exports = router;
