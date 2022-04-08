//Vamos a utilizar Contact, para hacer algunas pruebas

//Primera Pureba. Podemos introducir librerias a Angular que incluso no están adapatadas para ella. 
//Por ejemplo JQUERY no está desponeble especificamente para Angular. Lo tenemos que meter desde NPM.
//Una vez instalado con comando "npm i --save jquery", lo tenemos en package.json. Pero así sin más no funcionará
// Debemos ir a Angular.json y una vez alli ir  a Scripts [].
//Alli meteremos el path para llegar a jquery.min.js
//Hay que añadir esto en tsconfig.app.json "types": ["jquery"]
//Una vez hecho esto, jquery está disponible para utilizarlo e los componentes de angular. Ejemplo más abajo

//Ahora podemos utilizar culaquier plugin, sliders, etc basados en jquery que encontremos en la web. 



import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { NgForm } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contact: Contact;
  public status: string;
  constructor(private _contactService:ContactService) { 

  this.contact = new Contact('','','','');
  this.status = '';
  }

  ngOnInit(): void {

    


  }

  //Seguir por aqui
  onSubmit(form:any){

    $(".titleCreate").css("text-decoration", "none"); //La prueba de que funciona
    
  //Guardar datos en node.js
  this._contactService.dataToDb(this.contact).subscribe(
        
    response => {
        console.log(response);
        form.reset();
        return this.status = 'success'
    },
    error=> {
      console.log(<any>error);
      return this.status = 'failed'
    }
);


  }



}
