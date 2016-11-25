var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/notas_uq"); //Se conecta en nuestro servidor local a nuestra base de datos

var user_schema = new Schema({
	rol: String,
	nombre: String,
	apellido: String,
	correo: String
});

var User = mongoose.model("User", user_schema);

module.exports.User = User;