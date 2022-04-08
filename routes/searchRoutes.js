//Importamos express

const express = require('express');

//Tambien es necesario start el metodo ROUTER de express
// Con este método tranformamos app en router. El mismo router es como una app de express.

const router = express.Router();

//importamos el controller

const searchController = require('../controller/searchController');

router.get('/search',searchController.search_project);
router.get('/search/:id',searchController.search_project_id);

module.exports= router;