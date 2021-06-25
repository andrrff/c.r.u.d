var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstname: String,
    lastname: String,
    nickname: String,
    address: String,
    bio: String,
    dataLancamento: String,
    dataUltima: String
});

module.exports = UserSchema;
