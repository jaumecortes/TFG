var express = require('express');
const async = require('hbs/lib/async');
const passport = require('passport')
var router = express.Router();

//requerimos la base de datos
const base = require('../models/base')
const users = require('../models/user')

/* GET home page. */
router.get('/' , async (req, res, next) => {
  res.render('home')
});
router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/support', function(req, res, next) {
  res.render('support');
});
router.get('/download', function(req, res, next) {
  res.render('download');
});
router.get('/sign-in', function(req, res, next) {
  res.render('sign-in');
});
router.get('/sign-up', function(req, res, next) {
  res.render('sign-up');
});

/*
//base productos
router.get('/api/productos', async (req, res, next) => {
  const obtenerproductos = await base.find({});
  res.json(obtenerproductos)
});

router.post('/crearProducto', async (req, res, next) => {
  //console.log(req.body)
  const enviarproducto = new base(req.body); //body es la informacion que tiene el navegador
  await enviarproducto.save();
  //res.json(producto)
  res.redirect('/Crear-Producto')
  //res.json({ status: 'Task Saved' })
});

//editar producto
router.get('/editarProducto/:id', async (req, res, next) => {
  const productoeliminar = await base.findById(req.params.id)
  res.render('editarProducto', {productoeliminar})
})
router.put('/productoEditado/:id', async (req, res, next) => {
  console.log('hola')
  await base.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/')
})

//eliminar producto
router.delete('/eliminarProducto/:id', async (req, res) => {
  await base.findByIdAndDelete(req.params.id)
  res.redirect('/')
})
*/

// Rutas de usuarios
router.get('/Singin', (req, res) => {
  res.render('singin')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post("/register", async (req, res, next) => {
  const {nombre, email, password, passwordconfirm} = req.body
  const errors = []
  if (password != passwordconfirm) {
      errors.push({text: "Las contraseñas no coinciden"})
  }
  if(nombre.length < 4){
      errors.push({text: 'tienes que escribir un nombre'})
  }
  if(email.length < 4){
    errors.push({text: 'tienes que escribir un email'})
  }
  if(password.length <= 2){
    errors.push({text: 'tienes que escribir una password'})
}
  if (errors.length > 0) {
      res.render("register", {errors, nombre, email, password, passwordconfirm})
  } else {
      const emailUser = await users.findOne({email: email})
      if(emailUser){
        //console.log('email existe')
        res.redirect('/register')
      }
      const newUser = new users({nombre, email, password})
      //newUser.password = await newUser.encryptPassword(password)//remplaza la contraseña por la contraseña encriptada
      await newUser.save()
      res.redirect("/Singin")
  }
})

router.post("/Singin", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/Singin",
  failureFlash: true
}))

module.exports = router;
