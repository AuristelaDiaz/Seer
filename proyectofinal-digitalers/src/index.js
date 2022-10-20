//settings
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const Article = require('../models/article')
const articleRouter = require('../routes/articles')
const userRouter = require('../routes/users')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan');
const passport = require('passport')
const session = require('express-session');
const flash = require('connect-flash');


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false})) //recibo datos simples de forms
app.use(methodOverride('_method'))
require('../passport/local-auth');


//middlewares 
app.use(morgan('dev'));
app.use(session({ //config de session
    secret: 'mySecretSession',
    resave: false, 
    saveUninitialized: false
}));
app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
});

app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.loginMessage = req.flash('loginMessage');
    next();
})

// Ruta principal Home
app.get('/', async(req, res)=>{
    const articles = await Article.find().sort({
        createAt: "desc"
    }).limit(10)
    res.render('articles/index', {articles: articles})
});

app.get('/home', async(req, res)=>{
    const articles = await Article.find().sort({
        createAt: "desc"
    }).limit(10)
    res.render('articles/home', {articles: articles})
})

// MongoDB connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log('conectado a MongoDB Atlas'))
    .catch((err)=> console.error(err))


//RUTAS

app.use('/articles', articleRouter);

app.use('/users', userRouter);


app.use('/public/', express.static('./public/'))


app.listen(port,
    ()=> console.log(`Servidor escuchando en el puerto ${port}`)
)
