var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;

var UserSchema = new Schema({
    firstname:      String,
    lastname:       String,
    nickname:       String,
    address:        String,
    bio:            String,
    dataLancamento: Date,
    dataUltima:     Date,
});

module.exports = UserSchema;
