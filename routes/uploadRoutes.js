//Importamos express

const express = require('express');

//Tambien es necesario start el metodo ROUTER de express
// Con este método tranformamos app en router. El mismo router es como una app de express.

const router = express.Router();

//Para el metodo post upload, necesitamos añadir un middleware llamado MULTIPART para que nodejs reconozca los FILES que estamos
//uploading y podamos trabajar con ellos. 

const multipart = require('connect-multiparty');

const multipartMiddleware = multipart({uploadDir: './uploads'}) //usando el middleware indicamos con uploadDir donde se van  a guardarlas iamgenes.
//para poder ejecutar nuestro middleware , lo tenemos que aplicar a la ruta que deseemos. Siempre que queramos aplicar
// un middleware a una ruta, lo tendremos que poner como segundo parámetro, antes del cotrolador.


//importamos el controller

const uploadController = require('../controller/uploadController');

router.get('/get/:image',uploadController.get_image);

router.post('/upload/:id', multipartMiddleware, uploadController.upload_image); 



module.exports= router;