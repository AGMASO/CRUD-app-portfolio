import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//Importamos los componentes

import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateProjectsComponent } from './components/create-projects/create-projects.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { DetailedComponent } from './components/detailed/detailed.component';
import { EditComponent } from './components/edit/edit.component';


const routes: Routes = [ //dentro de Routes incluimos las rutas o urls que van  a llevar a cada página o componente. 

{path: '', redirectTo: '/home' , pathMatch: 'full' },
{path: 'home', component:HomeComponent},
{path: 'about', component: AboutComponent},
{path: 'contact', component: ContactComponent},
{path: 'create-projects', component: CreateProjectsComponent},
{path: 'projects', component: ProjectsComponent},
{path: 'detailed/:id', component: DetailedComponent},
{path: 'edit/:id',component: EditComponent},
{path:'**', component: NotFoundComponent} //Para status 404

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Exportamos con nombre routing Components los componentes.
 
export const routingComponents = [HomeComponent,AboutComponent,ContactComponent,
                                  CreateProjectsComponent,ProjectsComponent,DetailedComponent,EditComponent,NotFoundComponent]
