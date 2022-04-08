//  AQUI ENCONTRARÁS COMO INCLUIR UNA IMAGEN A UN MODELO YA CREADO. FUNCIONA PERFECTO.



//Importamos Objeto Project

const Project = require('../models/project');

//Añadimos FS para poder eliminar foramtos de imagenes no deseados

const fs = require('fs')

const path = require('path');

const upload_image = (req,res)=>{

   
    let projectId = req.params.id;
    let fileName = 'Image no uploaded';

    if(req.files){

        //estas variables las creamos una vez que ya hemos creado el multiparty en la route upload.

        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[1];// es [1], porque al usar split, hemos creado un array con dos elementos, antes de y despues de. Queremos selccionar el despues de \\ por eso [1];

        //Vamos a mejorar este código, haciendo que solo las imagenes con cierto formato se guarden, y que las otras
        //no se acepten como formato y que además no queden en nuestro backend.

        let extSplit = fileName.split('\.');
        let fileExt = extSplit[1];

        //creamos el IF para este fin de las extensiones.

        if( fileExt === 'jpg' || fileExt === 'png' || fileExt ==='jpeg' || fileExt ==='gif'){

            //una vez que ya tenemos la imagen sintetizada en una sola línea. ahora la vamos a añadir a nuestro objeto project.
            // Para ello necesitamos, el porjectID donde vamos a indicar a que projecto le vamos a añadir la image.
            //Esto lo haremos con UPDATE ya que los projectos ya están creados pero sin imagen.

            Project.findByIdAndUpdate(projectId, {image: fileName},{new: true}, (err, projectUpdated)=>{

                if(err) return req.status(500).send({message :'Image not uploaded'});

                if(!projectUpdated) return req.status(404).send({message : 'Not found'})
            
                return res.status(200).send({

                //files: req.files //Req.files es donde esta toda la informacion de la imagen subida. pero no es accesible con node.js. Debemos añadri el multiparty para poder trabajar con ella.
                //files: fileName
                project: projectUpdated
                });
            });

        }else{

            //else, vamos a borrar ese archivo y mostrar un mensaje que diga 'formato no válido'
            //para ello debemos importar un modulo llamado FS
            
            fs.unlink(filePath, (err)=>{

                return res.status(200).send({
                    message: 'Ext is not valid'
                });
            });


        }



        

    }

}

const get_image = (req,res)=>{




    var file = req.params.image;
    console.log (req.pathname);
    //console.log(file);
    var path_file = './uploads/'+file;
    //console.log(path_file);

    fs.exists(path_file, (exists)=>{
        if(exists){
            console.log(file);
            return res.sendFile(path.resolve(path_file)); //ATENCION, path.resolve() es un metodo perteneciente a un modulo de nodeJS llamado PATH. Tenemos que importarlo para que funcione.
        }else{

            return res.status(200).send({ 
                
                message : " Image doens´t exists"
            });
        }
    });

}



module.exports={upload_image,get_image};