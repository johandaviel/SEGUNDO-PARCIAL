var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var User = require("./models/user").User;  
var cookieSession = require("cookie-session");
var router_app = require("./router_app");
var session_middleware = require("./middlewares/session")
var methodOverride = require("method-override");


app.use("/public",express.static('public'));
app.use(bodyParser.json()); //para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"))

app.use(cookieSession({
	name: "session",
	keys: ["lave-1", "llave-2"]
}));

app.set("view engine", "jade");

app.get("/", function(req, res){
	console.log(req.session.user._id);
	res.render("index"); 
});

app.get("/signup", function(req, res){
	User.find(function(err, doc){
		console.log(doc);
		res.render("signup");
	});
});

app.get("/login", function(req, res){
		res.render("login");
});


app.post("/users", function(req, res){
	var user = new User({email: req.body.email, 
		password: req.body.password, 
		password_confirmation: req.body.password_confirmation, 
		username: req.body.username
	})
	user.save().then(function(us){
		res.redirect("/app/contactos")
	}, function(err){
		if(err){
			console.log(String(err));
			res.send("No pudimos guardar la informacion");
		}	
	})

});

app.post("/sessions", function(req, res){

	User.findOne({email:req.body.email,password:req.body.password}, function(err, user){	
	req.session.user_id = user._id;
	res.redirect("/app");
	})
});

app.use("/app", session_middleware);
app.use("/app", router_app);


app.listen(8080);