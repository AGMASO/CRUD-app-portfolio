//Modulos que debemos importar para este proyecto

//Models
const Project = require('./models/project');
const Contact = require('./models/contact');

//Routes
const addRoutes = require('./routes/addRoutes');
const searchRoutes = require('./routes/searchRoutes');
const uploadRoutes = require ('./routes/uploadRoutes');
const contactRoutes = require ('./routes/contactRoutes');
//Config

const config = require('./config/database');
require("dotenv").config();

//Import Variables Local

require("dotenv").config({path: 'variables.env' });


//Modules
const path = require ('path');//??
//Lo primero crear express app.
const express = require('express');

const app = express();

//importamos Bodyparser

const bodyParser = require ('body-parser')

//Importamos mongoose para poder conectar con mongoDB facilmente
const mongoose = require('mongoose');

//creamos const mongoURI con la dirección donde de mongoDB donde está la base de datos que asignamos al proyecto
/*const mongoURI = 'mongodb://localhost:27017/projectFinal';*/

//utilizamos mongoose para llamar a la libreria + metodo connect + como parametro la direccion de mongoDB.
//Siempre añadir .then (()=>{  }); y .catch((err)=>{  }); 
/*app.listen(process.env.PORT || 8080); */


//Read variables dependig localhost and port

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000 || 80;

app.listen(port, host, ()=>{
    console.log('Server is working very good')
});


mongoose.connect(process.env.MONGODB_URI_LOCAL)
    .then(()=>{
        //Tarda en conectarse a la DB un poco. Por lo que no queremos tener REQ hasta que no estemos conectados. por ello 
        //vamos a pasar aqui dentro el app.listen(3000), con el fin de que nos escuchamos req hasta que no estemos conectados.
        
          /*app.listen(3000);*/
        console.log('connected to mongoDB')
        console.log(process.env.MONGODB_URI_LOCAL)
    })
    .catch((err)=>{
        console.log(err);
    });



//MIDDLEWARES

//Middleware para los POST events. Viene incluido en Express. Hay que ponerlo para que funcione el metodo post.

    app.use(express.urlencoded({extended:true}));

    /**
     * ! MUY IMPORTANTE, NECESARIO PARA DECIRLE A NODE.JS Y A EXPRESS DE DONDE TIENE QUE CARGAR EL INDEX.HTML. EN ESTE 
     * !CASO DE LA CARPETA DIST DONDE HEMOS HECHO EL BUILD THE ANGULAR.
     */
    app.use(express.static(__dirname + '/dist')); 
    
//Middleware para body-parser. para manipular los datos del objeto con json. !!SUPER IMPORTANTE!! NO OLVIDAR, SI NO NO FUNCIONA 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar cabeceras y cors SUPER IMPORTANTE CUANDO TRABAJAMOS CON ANGULAR Y NODEJS PARA QUE NO DE FALLOS.
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});*/


//ROUTES

//Vamos a añadir un projecto nuevo a la base de datos.
app.use(addRoutes);

//Vamos a buscar los projectos que hay en la base de datos
app.use(searchRoutes);

//Route para upload images

app.use(uploadRoutes);

//Routes para collection Contact.

app.use(contactRoutes);


//EXPORT

module.exports = app;

