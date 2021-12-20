import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { AppDashboardRoutingModule } from './app-dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { FormsModule } from '@angular/forms';
import { GraphComponent } from './graph/graph.component';


@NgModule({
  declarations: [
    DashboardHomeComponent,
    GraphComponent
  ],
  imports: [
    CommonModule,
    AppDashboardRoutingModule,
    MatCardModule,
    FormsModule
  ]
})
export class AppDashboardModule { }
