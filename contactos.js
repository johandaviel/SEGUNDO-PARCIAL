var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var email_match = [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Coloca un email valido"];

var contac_schema = new Schema({
	name:{type:String, required:"Ingrese el nombre"},
	lastname:String,
	email:{type:String, required:true, match:email_match},
	telefono: {type: String, length:[10, "Digite un numero valido"]},
	creator: {type: Schema.Types.ObjectId, ref: "User"}
});

var Contacto = mongoose.model("Contacto", contac_schema);

module.exports = Contacto; 