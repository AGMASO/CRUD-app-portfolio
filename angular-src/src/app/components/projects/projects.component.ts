import { Component, OnInit } from '@angular/core';

//Primero, nuestro MODEL, en el que está definido los parametros de nuestro proyecto.
import { Project } from '../../models/project';

//Segundo, debemos importar el servicio que nos permite hacer REQ y RES a nuestra API / base de datos.
import { ProjectService } from 'src/app/services/project.service';

import { Global } from 'src/app/services/Global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers:[ProjectService]
})
export class ProjectsComponent implements OnInit {

  public title: string;

  public url: String;

  public projects: Project[];

  constructor( private _projectService:ProjectService) {

    this.title= "All created Projects"
    this.url = Global.url;
     }

  ngOnInit(): void {

    this.getProject();
    

}

getProject(){this._projectService.indexProjects().subscribe(

  response => {
      if(response.projects){

        this.projects = response.projects;
      }
    
    },
  error=> {
    console.log(<any>error);
  }

  )
  };
}
