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
    firstname: String,
    lastname: String,
    nickname: String,
    address: String,
    bio: String,
});

module.exports = ProdutoSchema;
