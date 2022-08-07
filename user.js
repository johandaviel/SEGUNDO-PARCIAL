var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1");

var email_match = [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Coloca un email valido"];

var user_schema = new Schema({
	name: String,
	username: {type:String, required: "Username obligatorio"},
	password: {
		type:String,
		minlength:[8, "La clave es muy corta"], 
		validate: {
			validator: function(p){
				return this.password_confirmation == p;
			},
			message: "Las claves no son iguales"
		}
	},
	email: {type: String, required: "el correo es obligatorio", match:email_match}
});

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});

var User = mongoose.model("User", user_schema); 

module.exports.User = User;