//CON ESTE SERVICIO VAMOS A CREAR EL ACCESO A LA API DESDE ANGULAR. SERIA EQUIVALENTE AL HTTP.SERVICE 
//vamos a indicarle mediante el metodo HttpClient, la url de nuestra API. 


import { Injectable } from "@angular/core"; //Metodo necesario para servicios
import { HttpClient, HttpHeaders } from "@angular/common/http"; //metodo necesario para llamadas a la API
import { Observable } from "rxjs"; //metodo necesario para subscribir la información recogida en la Api a el subcriptor.
import { Contact } from "../models/contact"; 
import { Global } from "./Global"; // nuestra configuracion predefinida por nosotros. EN este caso incluye la direccion a la API
import { Params } from "@angular/router";



//Primero de todo, para los servicios siempre debemos introducir el INJECTABLE de Angular para declarar que es una
//clase inyectable, es decir, que vamos a estar introduciendo en otras partes de la estructura de angular.

@Injectable({
    providedIn: 'root'
  })

  export class ContactService{ //Aquí creamos la susodicha clase

    public url: string;

    //Debemos introducir como parametro el metodo http.
    constructor(private _http: HttpClient){ 

        //Le asignamos la url. En este caso la hemos definido en Global + añadimos .url
        this.url = Global.url;
    }

    //Añadimos una function de prueba, para ver que todo funciona bien. 
    testService(){ 

      return console.log('Probando el servicio de la API ');
    }

    

    //aqui creamos una function para enviar por metodo POST la informacion recogida en el objeto Contact , que viene del formulario,
    //y enviarlo a nuestra base de datos, que esta asociada a la propiedad URL que hemos definido.
    dataToDb(contact:Contact):Observable<any>{

      let params = JSON.stringify(contact);//para tranformar datos a json basado en el objeto project
      let headers = new HttpHeaders().set('Content-Type', 'application/json');//modificamos headers indicando que es un json
      

      /*return this._http.post('contactadd', params, {headers:headers}); */return this._http.post('contactadd', params, {headers:headers}); 
      //Con esta linea de codigo hacemos lo mismo que con app.post(req,res) de node.js. aqui hay que escribirlo asi.

    }


    
  }
  //Ahora nos queda importar en app.module el metodo http, si no no funcionará.