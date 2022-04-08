//Controlador para todo lo realcionado con 

const Contact = require('../models/contact'); //importamos el MODELO Project, que lo vamos a necesitar porque está incluido en el código

//Test
const add = (req,res)=>{

const contact = new Contact({

    name: 'Alejandro ',
    firstName:'Guindo',
    message:'Te quiero contratar',
});

contact.save()
   .then((result)=>{
      res.send(result)
   })
   .catch((err)=>{
      console.log(err);
   });

}

//Post method of Contact

const postInfo = (req,res)=>{

    let contact = new Contact();

    contact.name = req.body.name;
    contact.firstName = req.body.firstName;
    contact.message = req.body.message;
    
    //METODO 1
    /*contact.save()
    .then((result) =>{
         console.log(result);
    })
     .catch((err)=>{
        console.log(err);
     });

     return res.status(200).send({
       
      contact:contact,
      message:"Metodo addPost funciona"})*/

      //METODO 2.  Los dos Funcionan bien.
      contact.save((err, contactsfile)=>{

        if(err) return res.status(500).send({message: 'Error to save data'});
        if(!contactsfile) return res.status(404).send({message: 'Not found'});
        console.log(contactsfile);
        return res.status(200).send({contactsfile});
  
     });

}



module.exports = {add,postInfo}