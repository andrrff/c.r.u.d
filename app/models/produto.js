var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * Produto:
 *
 * -> Id: int
 * -> Nome: String
 * -> Preco: Number
 * -> Descricao: String
 *
 */

var ProdutoSchema = new Schema({
    nome: String,
    preco: Number,
    descricao: String,
});

module.exports = ProdutoSchema;
