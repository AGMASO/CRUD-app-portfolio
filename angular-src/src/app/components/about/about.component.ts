import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
 
  public title:string;       
  public subtitle:string;
  public email: string;

  constructor(){

    this.title = "Blockchain and Front/Backend Developer";
    this.subtitle = "Discover more about me. Who is Alejandro? Which background he has? Let me explain you.";
    this.email = "Agmguindo@gmail.com"

   }

  ngOnInit(): void {
  }

}
