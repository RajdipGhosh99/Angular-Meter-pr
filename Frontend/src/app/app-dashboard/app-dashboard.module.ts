import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppDashboardRoutingModule } from './app-dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';


@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    AppDashboardRoutingModule
  ]
})
export class AppDashboardModule { }
