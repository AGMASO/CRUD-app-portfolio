//Creamos un modelos para dar estructura a nuestros proyectos en la base de datos

const mongoose = require('mongoose'); //importamos moongoose siempre.

const Schema = mongoose.Schema; //utilizamos el método schema de mongoose.

const contactSchema =new Schema({
    
    
    name: String,
    firstName:String,
    message:String
  
},{ timestamps: true});


const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;