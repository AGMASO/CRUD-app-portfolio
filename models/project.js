//Creamos un modelos para dar estructura a nuestros proyectos en la base de datos

const mongoose = require('mongoose'); //importamos moongoose siempre.

const Schema = mongoose.Schema; //utilizamos el método schema de mongoose.

const projectSchema =new Schema({
    name: String,
    description:String,
    category:String,
    year: Number,
    lang:String,
    image:String    

},{ timestamps: true});


const Project = mongoose.model('Project',projectSchema);

module.exports = Project;