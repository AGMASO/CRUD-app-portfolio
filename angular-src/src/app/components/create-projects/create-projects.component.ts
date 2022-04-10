//EN ESTE COMPONENTE, VAMOS A CREAR EL FORMULARIO PARA AÑADIR NUEVOS PROJECTOS. POR ESO TENEMOS QUE IMPORTAR CIERTAS COSAS.
import { Component, OnInit } from '@angular/core';
//Primero, nuestro MODEL, en el que está definido los parametros de nuestro proyecto.
import { Project } from '../../models/project';

//Segundo, debemos importar el servicio que nos permite hacer REQ y RES a nuestra API / base de datos.
import { ProjectService } from 'src/app/services/project.service';
import { NgForm } from '@angular/forms';

//Servicio creado para Upload images to backend.
import { UploadService } from 'src/app/services/upload.service';

import {Global} from '../../services/Global'


@Component({
  selector: 'app-create-projects',
  templateUrl: './create-projects.component.html',
  styleUrls: ['./create-projects.component.css'],

  //Debemos añadir Providers, para cargar nuestro servicio.
  providers: [ProjectService,UploadService]
})

export class CreateProjectsComponent implements OnInit {

  //Aqui vamos a crear las propiedades que tendrá este componente.

  public title: string;
  public status: String;

  public filestoUpload: Array<File>;

  public url:string;

  //MUY IMPORTANTE. aquí definimos una nueva propiedad que la estamos llamando project. Esta es de tipo Project,
  //Lo que quiere decir que va a tener las características de nuestro Model Project , al que apunta.
  public project: Project;
  constructor( private _projectService:ProjectService, private _uploadService: UploadService) {

    this.title ="Fill in the fields to create your new project";
    this.project = new Project('','','','',2022,'',''); //Como ves, tenemos que crear un new Project y dejar cada parametro vacio para luego rellenarlo con el formulario.
    this.status = '';
    this.url = Global.url;
   }


  ngOnInit(): void {
  }
  
  onSubmit(form: any){
    
    
    //Guardar datos en node.js
    this._projectService.enrollDatatoDB(this.project).subscribe(
        
        response => {

          if(response.project){
            

            //Subir Imagen. Aqui clavamos la lógica para introducir al objeto project la imagen.

            this._uploadService.makeFileRequest(Global.url + 'upload/'+ response.project._id, [], this.filestoUpload, 'image')
                                .then((result:any)=>{
                                this.status='success'
                                console.log(result);
                                form.reset();
            });
          
            
          }else{
            
            this.status='failed'   
          };
       

        },
        error=> {
          console.log(<any>error);
        }
    );
      
      
  }



  fileChangeEvent(fileInput: any){

    console.log(fileInput);// En console.log nos muestra que cuando modificamos el placeholder Files de imagenes, actua y nos 
                            // ejecuta nuestra function fileCHangeEvent. Vemos además que nos da todos los datos de la imagen,
                            // bajo el parametro fileImput > target > files. Tenemos que crear una property para capturar solo
                            //Lo que nos interesa que es Files. 

    this.filestoUpload = <Array<File>>fileInput.target.files; //Con esto tenemos una Array de todos los datos importantes de la imagen
                                                              //Como nombre, fecha de upload, etc...
       
  }
  //Ahora una vez que tenemos preparados con fileChangeEvent, los datos que queremos enviar a node.js, se lo pasamos al metodo ONSUBMIT.
}

      

