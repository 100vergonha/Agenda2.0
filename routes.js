const express = require ('express');
const route = express.Router();
const homeControllers = require('./src/controllers/homeControllers');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const {loginRequired} = require('./src/middlewares/middleware')
//rotas da home
route.get('/', homeControllers.index);

//Rotas qualquer
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);


//Rotas de contatos
route.get('/contato/index', loginRequired, contatoController.index)
route.post('/contato/register', loginRequired, contatoController.register)
route.get('/contato/index/:id', loginRequired, contatoController.editIndex)
route.post('/contato/edit/:id', loginRequired, contatoController.edit)

module.exports = route;