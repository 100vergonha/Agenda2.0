//todos-os-NPM
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');
//const helmet = require('helmet');
const csrf= require('csurf');

//app.use();
//app.use(helmet.referrerPolicy({policy:["origin", "unsafe-url"]}));
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.resolve(__dirname, 'public')));
// conection MongoDB
const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTIONSTRING,
{useNewUrlParser:true})
.then(() =>{
    console.log('MONGO conectado')
    app.emit('pronto');
}).catch((err)=>{
    console.log('Erro ao conectar ao Mongo online')
});
const sessionOptions = session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    },
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  });
  app.use(sessionOptions);
  app.use(flash());
//App.set();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use();
app.use(csrf());
//MIDDLEWARES usados
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

//PORTA acesso ao servidor!!
app.on('pronto',()=>{
  app.listen(3000, () =>{
      console.log('acessar servidor http://localhost:3000')
  })
});