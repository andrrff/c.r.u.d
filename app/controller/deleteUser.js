const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const ProdutoSchema = require("../models/produto");

//Criando uma instancia das rotas via Express
const router = express.Router();

const padrao = mongoose.model("Produtos", ProdutoSchema);

// 5) Método: DELETE por Id (acessar: http://localhost:8000/data/:produto_id)
router
    .route("/data/:produto_id")
    .delete((req, res) => {
        padrao.remove(
            {
                _id: req.params.produto_id,
            },
            (error) => {
                if (error)
                    res.render("pages/error", {
                        title: "Error",
                        subtitle: "Infelizmente algo inesperado ocorreu",
                        error: error,
                    });

                router.route('/');
                res.render('pages/delete',
                {title: "Item deletado"})
            }
        );
    });

module.exports = router;
