var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var GITHUB_CLIENT_ID = "6c19a6cb33f7868677c8";
var GITHUB_CLIENT_SECRET = "08ecd5cea27678daab71fcdcd5e93fc1ce378965";

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new GitHubStrategy({
	clientID: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET,
	callbackURL: "http://localhost:8080/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
	User.findOrCreate({ githubId: profile.id }, function (err, user) {
		return done(err, user);
	});
}
));

var app = express();//Ejecuta express


app.use(express.static('public'));

app.use(bodyParser.json()); //para peticiones application/json
app.use(bodyParser.urlencoded({extended: true})); //define con que libreria va a realizar el parsing. En este caso si permite hacer parsing

app.set("view engine", "jade"); //identifica la vista que se estara utilizando

//Son los elementos de la navegacion
app.get("/", function(req, res){
	res.render("index");
});

app.get('/auth/github',
	passport.authenticate('github', { scope: [ 'user:email' ] }),
	function(req, res){}
});

app.get('/auth/github/callback', 
	passport.authenticate('github', { failureRedirect: '/' }),
	function(req, res) {
		res.redirect("/users");
	}
});

app.get("/users", function(req, res){
	res.render("./estudiante/inicio");
	
});

app.get("/users/cursos", function(req, res){
	res.render("./docente/inicio");
});

app.get("/users/actividades", function(req, res){
	res.render("./docente/listaActividades");
});

app.get("/users/estudiantes", function(req, res){
	res.render("./docente/estudiantes");
});

app.get("/users/actividades/ver", function(req, res){
	res.render("./docente/verActividad");
});

app.get("/users/actividades/nuevo", function(req, res){
	res.render("./docente/nuevo");
});

//Escucha en el puerto nuestra aplicacion
app.listen(8080);