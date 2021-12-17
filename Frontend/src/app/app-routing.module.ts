import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { RoleComponent } from './role/role/role.component';
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
    path:"about",
    component:AboutComponent
  },
  {
    path:"contact",
    component:ContactComponent
  },
  {
   path:"role",
   component:RoleComponent 
  },
  {
    path:"meter",loadChildren:()=>(import('./meter/meter.module')).then(m=>m.MeterModule)
  },
  {
    path:"user",loadChildren:()=>(import("./user/user.module")).then(m=>m.UserModule)
  },
  {
    path:"dashboard",loadChildren:()=>(import("./app-dashboard/app-dashboard.module")).then(m=>m.AppDashboardModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
