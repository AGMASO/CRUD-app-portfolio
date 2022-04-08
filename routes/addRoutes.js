//Importamos express

const express = require('express');

//Tambien es necesario start el metodo ROUTER de express
// Con este método tranformamos app en router. El mismo router es como una app de express.

const router = express.Router();

//Importamos el controlador necesario.
const addController = require('../controller/addController');

//Metodo Get 
router.get('/add',addController.add_project);

//Metodo Post

router.post('/add', addController.addPost_project);

//Metodo Delete

router.delete('/delete/:id',addController.deleteProject);

//Metodo Update

router.put('/update/:id',addController.updateProject);

//exportamos este documento para imporatarlo en index.js

module.exports = router;

