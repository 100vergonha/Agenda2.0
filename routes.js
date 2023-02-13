const express = require ('express');
const route = express.Router();
const homeControllers = require('./src/controllers/homeControllers');
const loginController = require('./src/controllers/loginController');

//rotas da home
route.get('/', homeControllers.index);

//Rotas qualquer
route.get('/login/index', loginController.index);

module.exports = route;