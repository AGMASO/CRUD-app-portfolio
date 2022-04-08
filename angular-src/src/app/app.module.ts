import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routingComponents } from './app-routing.module';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http'; //necesario para enviar req y res a Api
import { FormsModule } from '@angular/forms'; // Necesario para crear Forms y two way data binding.
import { ProjectService } from './services/project.service';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateProjectsComponent } from './components/create-projects/create-projects.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { DetailedComponent } from './components/detailed/detailed.component';
import { EditComponent } from './components/edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    CreateProjectsComponent,
    ProjectsComponent,
    NotFoundComponent,
    routingComponents,
    HomeComponent,
    DetailedComponent,
    EditComponent,
    
    
  ],
  imports: [ //imports en app.module, nos carga estos metodos en todos los componentes. 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
