import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role/role.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    RoleComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports:[
    RoleModule
  ]
})
export class RoleModule { }
