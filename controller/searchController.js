

//Importamos Objeto Project

const Project = require('../models/project');

const search_project = (req,res)=>{

   

      //Este método anterior funciona perfectamente, pero no me mete los objetos de la DDBB en un objeto llamado projects. Los deja
    //sin dueño, por asi decirlo. Entonce sme falla para luego hacer el *ngFor.
   /*Project.find()
   .then((project)=>{
      
       res.send(project);
    })
    .catch((err)=>{
       console.log(err);
    });*/

    Project.find({}).exec((err, projects)=>{

      if(err) return res.status(500).send({message: 'Error al devolver los datos'});
      if(!projects) return res.status(404).send({message: 'El proyecto no existe'});
      return res.status(200).send({projects});

   });
   
   
}
//metodo para buscar un projecto por id.
const search_project_id = (req,res)=>{

   const id = req.params.id;
   
   /*Project.findById(id)
   .then((project)=>{
      
       res.send(project);
    })
    .catch((err)=>{
       console.log(err);
    });*/


    Project.findById(id, (err,project)=>{

      if(err) return res.status(500).send({message: 'Error al devolver los datos'});
      if(!project) return res.status(404).send({message: 'El proyecto no existe'});
      return res.status(200).send({project});
    })


}

module.exports={ search_project,search_project_id};