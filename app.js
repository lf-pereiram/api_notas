var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var app = express();//Ejecuta express


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/notas_uq"); //Se conecta en nuestro servidor local a nuestra base de datos

var userSchemaJSON = {
	email: String,
	password: String
}

var user_schema = new Schema(userSchemaJSON);
var User = mongoose.model("User", user_schema);

app.use("/public", express.static('public'));

app.use(bodyParser.json()); //para peticiones application/json
app.use(bodyParser.urlencoded({extended: true})); //define con que libreria va a realizar el parsing. En este caso si permite hacer parsing

app.set("view engine", "jade"); //identifica la vista que se estara utilizando

//Son los elementos de la navegacion
app.get("/", function(req, res){
	res.render("index");
});

app.post("/users", function(req, res){
	var user = new User({email: req.body.email, password: req.body.password});

	user.save(function(){
		res.send("Se guardaron los datos");
	});
});

//Escucha en el puerto nuestra aplicacion
app.listen(8080);