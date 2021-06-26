const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const UserSchema = require("../models/user");
const padrao = mongoose.model("Users", UserSchema);
const Msg = require("../public/js/msg");

const msg = new Msg();

const router = express.Router();


router
    .route("/data/:produto_id")
    .delete((req, res) => {
        // Removendo por parametro no caso o ID
        padrao.deleteOne(
            {
                _id: req.params.produto_id,
            },
            (error) => {
                if (error)
                {
                    res.render("pages/error", {
                        title: msg.titleError,
                        subtitle: msg.subtitleError,
                        error: error,
                    });
                    console.log("DELETE -> /data/" + req.params.produto_id + " ❌ - " + error);
                }
                
                router.route("/");
                res.render("pages/actionPage", { title: msg.deleted });
                console.log("DELETE -> /data/" + req.params.produto_id + " ✅");
            }
        );
    });

module.exports = router;
