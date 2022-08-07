var Contacto = require("../models/contactos");
var owner_check = require("./contact_permissions")

module.exports = function(req, res, next){
	Contacto.findById(req.params.id)
		.populate("creator")
		.exec(function(err,contacto){
			if(contacto != null && owner_check(contacto,req,res)){
				res.locals.contacto = contacto;
				next();
			}else{
				res.redirect("/app");
			}
		})
}