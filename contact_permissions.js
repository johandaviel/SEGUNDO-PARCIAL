var Contacto = require("../models/contactos");

module.exports = function(contacto,req,res){
	//busca el registro
	//true si tengo permisos
	//false si no tengo permisos
	if(req.method === "GET" && req.path.indexOf("edit")<0){
		return true;
	}
	
	if(typeof contacto.creator == "undefined") return false;


	if(contacto.creator._id.toString() == res.locals.user._id){
		//yo subi el registro
		return true;

	}
	return false;
}