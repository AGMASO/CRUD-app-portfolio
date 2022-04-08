//Importamos express

const express = require('express');

//Tambien es necesario start el metodo ROUTER de express
// Con este método tranformamos app en router. El mismo router es como una app de express.

const router = express.Router();

//Importamos el controlador necesario.
const contactController = require('../controller/contactController');


//metodo Get test

router.get('/contactadd',contactController.add);

//metodo Post 

router.post('/contactadd',contactController.postInfo);


module.exports = router;