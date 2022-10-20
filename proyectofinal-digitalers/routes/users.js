const express = require("express");
const router = express.Router(); //nos devuelve un objeto 
const passport = require('passport'); 
const user = require("../models/user");
const User = require('../models/user')

// REGISTRAR USUARIO
router.get('/signup', async (req, res) => {
    res.render("users/signup");
    console.log(req.body)
    /*const { name, email, password } = req.body
    try{
        let user = await User.findOne({email: email});
        user = new User({name, email, password});
        await user.save()
        res.redirect('users/login')
    } catch (error){
        res.render({error: error.message});
    }
    res.json(req.body)*/
});


// SE GUARDA EL USUARIO REGISTRADO 
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/home',
    failureRedirect: '/users/signup',
    passReqToCallback: true
}))


// LOGUEA UN USUARIO
router.get('/login', (req, res, next) => {
    res.render("users/login");
});


// SE VALIDA LOS DATOS DEL USUARIO
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/users/login',
    passReqToCallback: true
}));

//PROFILE
router.get('/home', isAuthenticated, (req, res, next) => { //evita que un usuario que no se haya logueado vaya a la pagina perfil
    if(user){
        res.render('/home');
    }else{
        res.redirect('/')
    }
});


//LOGOUT
router.get('/logout', function (req, res){
    req.session.destroy(function (err) {
      res.redirect('/'); //Inside a callback… bulletproof!
    });
  });


function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/')
}




module.exports = router;
