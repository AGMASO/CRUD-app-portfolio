import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projectFinal';
  
  constructor(){

    
}
onClick(){
  let menu = document.getElementById('botondecisivo')?.getAttribute("aria-expanded");
  
 console.log(menu);
 
 if(menu == "true"){
 
  menu = "false"

 }else{
  menu = "true"
  
 }

 if(menu == "false"){

  document.getElementById('navbarNav')?.classList.remove('show');
  document.getElementById('botondecisivo')?.classList.add('collapsed');
 }
 return document.getElementById('botondecisivo')?.setAttribute("aria-expanded", 'false');

}
}

