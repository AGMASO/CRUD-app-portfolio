
//Controlador para todo lo realcionado con 

const Project = require('../models/project'); //importamos el MODELO Project, que lo vamos a necesitar porque está incluido en el código


const add_project = (req,res)=>{ //add_project es = a una function con parametros REQ,RES y dentro de ella insertamos todo el código de Routes.

   const project= new Project({

      _id: '75',
      name: 'Third Project created',
      description: 'Data Science is great',
      category: 'Science',
      year: 2021,
      lang: ['Python','english'],
      image: 'Snake.jpg',
  });

  project.save()
   .then((result)=>{
      res.send(result)
   })
   .catch((err)=>{
      console.log(err);
   });

}


//.addPost_project para añadir projectos que vienen del formulario de Angular

const addPost_project = (req,res)=>{



    let project = new Project();

    
    project.name = req.body.name;
    project.description = req.body.description;
    project.category = req.body.category;
    project.year = req.body.year;
    project.lang = req.body.lang;
    project.image = null;

    project.save()
    .then((result) =>{
         console.log(result);
    })
     .catch((err)=>{
        console.log(err);
     });

     return res.status(200).send({
       
      project:project,
      message:"Metodo addPost funciona"})

 
}

//Metodo para borrar projectos
 
const deleteProject = (req,res)=>{

   const id = req.params.id;

   console.log(id);

    Project.findByIdAndDelete(id, (err, projectRemoved)=>{

      if(err) return res.status(500).send({message: "Not possible to delete"});

      if(!projectRemoved) return res.status(404).send({message: "Not finding that Project"});

      return res.status(200).send({

         project: projectRemoved
      })

    });
     
}

//Metodo Put para actualizar, editar

const updateProject = (req,res)=>{

   const id = req.params.id;
   let update = req.body;
   
   //Importante, no olvidarse de añadir opcion {new:true}, para que actualice los datos que añadimos nuevos.
   Project.findByIdAndUpdate(id, update,{new: true} ,(err, projectUpdated) =>{

      if(err) return res.status(500).send({message: 'Error to update'});

      if(!projectUpdated) return res.status(404).send({ message: 'Not project with this Id found'});

      return res.status(200).send({

         project: projectUpdated
      });


   });
}



module.exports = {add_project, addPost_project,deleteProject,updateProject}