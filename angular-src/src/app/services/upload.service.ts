// Servicio para upload images a nuestros projectos.

import { Injectable } from "@angular/core"; //Metodo necesario para servicios
import { Global } from "./Global"; // nuestra configuracion predefinida por nosotros. EN este caso incluye la direccion a la API

@Injectable({
    providedIn: 'root'
  })

export class UploadService{ 

    public url: string;
    
constructor(){

    this.url= 'upload/:id';
}


    //Creamos nuevo método. Nos va a permitir hacer una petición AJAX clásica pero a permitiendonos adjuntar un FILE (la imagen)

    makeFileRequest(url:string, params: Array<string>, files: Array<File>,name: string){
                    //le damos varios parametros, url, params, file y nombre
        //Creamos una Promise, que tiene dos estados, resolve y reject o  pending cuando todavia no se ha iniciado.
        //para cada estado le daremos una funcion. 
        return new Promise (function(resolve, reject){
            
            //primero vamos a simular la peticion ajax, mediante la creacion de un formulario clasico.

            let formData:any = new FormData();
            let xhr = new XMLHttpRequest();//xhr es el acronimo que es igual a AJAX. el objeto XMLHttpRequest es de peticiones asíncronas

            //creamos un FOR para recorrer el array de archivos que pueda estar llegando.
            for(let i = 0; i < files.length; i++){
                
                formData.append(name, files[i], files[i].name);// esto significa, añade al formulario el nombre del archivo, y los nombre de file.

            }

            xhr.onreadystatechange = function(){

                if(xhr.readyState === 4){
                  if(xhr.status === 200){
                      resolve(JSON.parse(xhr.response));
                  } else {

                    reject(xhr.response);
                  }
                }
            }

            xhr.open('POST',url, true); //xhr.open('POST', url, true);
            xhr.send(formData);

        });

        

    }


}

