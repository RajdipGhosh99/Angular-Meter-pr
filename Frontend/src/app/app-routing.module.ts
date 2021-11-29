import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  {
    path:"register",
    component:SignupComponent
  },
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"login",
    component:SigninComponent
  },
  {
    path:"about",
    component:AboutComponent
  },
  {
    path:"contact",
    component:ContactComponent
  },{
    path:"meter",loadChildren:()=>(import('./meter/meter.module')).then(m=>m.MeterModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
