import { Component, OnInit } from '@angular/core';

//Primero, nuestro MODEL, en el que está definido los parametros de nuestro proyecto.
import { Project } from '../../models/project';

//Segundo, debemos importar el servicio que nos permite hacer REQ y RES a nuestra API / base de datos.
import { ProjectService } from 'src/app/services/project.service';

import { Global } from 'src/app/services/Global';

//En este caso debemos importar el Router, ActivatedRouter y Params, para poder acceder al id que nos llega por la url.

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';



@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css'],
  providers:[ProjectService]
})
export class DetailedComponent implements OnInit {

  public url: String;
  public project: Project;
  //Crearemos un mensaje de confirmación de borrado. Para ello creamos una propiedad llamada confirm que será boolean.
  public confirm: boolean;

  constructor( private _projectService:ProjectService,
              private _router:Router,
              private _route:ActivatedRoute,
    
              ) {

    this.url= Global.url;
    this.confirm = false;
   }


   //Una vez incluido el Routerm y activedRoute y params, debemos poder seleccionar el ID que viene en la url para poder pasarselo
   // a nuestra function getOneProject, y que de ahí podamos llamar a nuestro servicio que su vez llamará al backend con el id correcto
   //para enseñarnos en el front end el proyecto correcto.

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

  deleteOneProject(id: any){

    this._projectService.deleteOneProject(id).subscribe(

      response =>{

        if(response.project){
          
          this._router.navigate(['/projects']);
          
        }
      },
      err=>{
        console.log(<any>err);
      }

    )
  }
  onTrue(){

    return this.confirm = true;
  }
  onFalse(){

    return this.confirm = false;
  }


}
