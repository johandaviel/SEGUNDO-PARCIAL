var express = require("express"); 
var Contacto = require("./models/contactos");
var router = express.Router();

var contact_finder_middleware = require("./middlewares/find_contact");

router.get("/", function(req, res){
	res.render("app/home");
});

router.get("/contactos/new", function(req,res){
	res.render("app/contactos/new")
});

router.all("/contactos/:id*", contact_finder_middleware);

router.get("/contactos/:id/edit", function(req,res){
	res.render("app/contactos/edit");
});

router.route("/contactos/:id")
	.get(function(req, res){
		res.render("app/contactos/show");
	})
	.put(function(req,res){
		res.locals.contacto.name = req.body.name,
		res.locals.res.locals.contacto.lastname = req.body.lastname,
		res.locals.res.locals.contacto.email = req.body.email,
		res.locals.res.locals.contacto.telefono = req.body.telefono;
		res.locals.contacto.save(function(err){
			if(!err){
				res.render("app/contactos/show");
			}else{
				res.render("app/contactos/"+req.params.id+"/edit")
			}
		})
	})
	.delete(function(req, res){
		Contacto.findOneAndRemove({_id: req.params.id},function(err){
			if(!err){
				res.redirect("/app/contactos");
			}else{
				console.log(err);
				res.redirect("/app/contactos"+req.params.id);
			}
		})
	});

router.route("/contactos")
	.get(function(req, res){
		Contacto.find({creator: res.locals.user._id}, function(err, contactos){
			if(err){
				res.redirect("/app"); return;
			}
			res.render("app/contactos/index", {contactos:contactos})
		});
	})

	.post(function(req,res){
		var data = {
			name: req.body.name, 
			lastname: req.body.lastname,
			email: req.body.email,
			telefono: req.body.telefono,
			creator: res.locals.user._id
		}

		var contacto = new Contacto(data);

		contacto.save(function(err){
			if(!err){
				res.redirect("/app/contactos/"+contacto._id);
			}else{
				console.log(contacto);
				res.render(err); 
			}
		})
	});


module.exports = router;