//Debemos importar los mudulos que importamos en Create-projects, ya que al igual que en ese formulario, debemos crear tambien los campos
// de igual forma para poder modificar lo que el cliente quiera.


import { Component, OnInit } from '@angular/core';

import { Project } from '../../models/project';

//Segundo, debemos importar el servicio que nos permite hacer REQ y RES a nuestra API / base de datos.
import { ProjectService } from 'src/app/services/project.service';
import { NgForm } from '@angular/forms';

//Servicio creado para Upload images to backend.
import { UploadService } from 'src/app/services/upload.service';

import {Global} from '../../services/Global'

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
@Component({
  selector: 'app-edit',

  //Reutilizamos la VIsta de create-projects, ya que ahi tenemos ya todo el formulario completo y adaptado. Debemos cambiar
  //el templateUrl y linkearlo a create-projects component html.
  templateUrl: '../create-projects/create-projects.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService,UploadService]
})
export class EditComponent implements OnInit {

  //Aqui vamos a copiar las mismas propiedades que tiene el componente Create-Projects

  public title: string;
  public status: String;
  public url: string;
  public filestoUpload: Array<File>;

  //MUY IMPORTANTE. aquí definimos una nueva propiedad que la estamos llamando project. Esta es de tipo Project,
  //Lo que quiere decir que va a tener las características de nuestro Model Project , al que apunta.
  public project: Project;
  constructor( 
    
    private _projectService:ProjectService,
    private _uploadService: UploadService,
    private _router:Router,
    private _route:ActivatedRoute,
    
    ) {
    this.url= Global.url;
    this.title =" Edit your Project adding text to place holders";
    //Eliminamos el objeto vacio, ya que ahora obtendremos el objeto ya completo en nuestra vista
    //no necesitamos crear un nuevo projecto. Por ello quitamos esta parte.
    //this.project = new Project('','','','',2022,'',''); //Como ves, tenemos que crear un new Project y dejar cada parametro vacio para luego rellenarlo con el formulario.
    this.status = '';
   }

//todo estos servicios y funciones los hemos copiado del componente DETAILED. Ya que necesitamos, de la misma forma, encontrar el proyecto
// mediante el ID y presentarlo en nuestra view. 

//Primero en ngOnInit, vamos a recoger por la url el id del projecto.Además se inicializa el metodo getOneProject
//Segundo, getOneProject llama al servicio haciendo la req del objeto con susodicha ID. 
//Tercero, nos devuelve el objeto como response, y este autocompleta nuestro formulario.
   ngOnInit(): void {

    this._route.params.subscribe(params =>{

      let id = params['id']; // Es igual a params.id ; lo hemos puesto asi por requerimiento de VIsual COde

      this.getOneProject(id);

    });

  }

  getOneProject(id:string){

    this._projectService.getOneProject(id).subscribe(

      response =>{
        

          this.project = response.project;
        


      },
      err =>{
        console.log(<any>err);
      }

    )

  }
  //Primero Copiamos todo el metodo onsubmit y fileChangeEvent de create-projects.ts para que nos funciones correctamente la VIews del formulario
  // en Edit.component.html.
  //Segundo debemos cambiar la function del _projectService, ya que ahora queremos el metodo UpdateOneProject y no el que viene 
  //por defecto de create-projects.component. qye era el enrollDataDB. Si no lo cambiamos, nos creará un nuevo projecto.

  onSubmit(form: any){
  //Guardar datos en node.js
  this._projectService.updateOneProject(this.project).subscribe(
        
    response => {

      if(response.project){
       

        

        //Subir Imagen. Aqui clavamos la lógica para introducir al objeto project la imagen.

        if(this.filestoUpload){ 
        this._uploadService.makeFileRequest(Global.url + 'upload/'+ response.project._id, [], this.filestoUpload, 'image')
                            .then((result:any)=>{
                            this.status='success'
                            console.log(result);

                            //Para el metodo Uptadate, quitamos el Form.reset(), ya que no nos interesa.
                            
        });
      }else{
          this.status='success'
      };
        
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
                        // bajo el parametro fileInput > target > files. Tenemos que crear una property para capturar solo
                        //Lo que nos interesa que es Files. 

this.filestoUpload = <Array<File>>fileInput.target.files; //Con esto tenemos una Array de todos los datos importantes de la imagen
                                                          //Como nombre, fecha de upload, etc...
   
}
//Ahora una vez que tenemos preparados con fileChangeEvent, los datos que queremos enviar a node.js, se lo pasamos al metodo ONSUBMIT

}
