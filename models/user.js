var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user_schema = new Schema({
	nombre: String,
	correo: String,
	rol: String,
	url: String
});
