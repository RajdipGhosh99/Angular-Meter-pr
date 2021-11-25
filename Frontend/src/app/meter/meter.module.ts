import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeterReadingComponent } from './meter-reading/meter-reading.component';
import { MeterDataComponent } from './meter-data/meter-data.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component'
import { AppRoutingModule } from '../app-routing.module';
import { GraphComponent } from './graph/graph.component';




@NgModule({
  declarations: [
    MeterReadingComponent,
    MeterDataComponent,
    DashboardComponent,
    GraphComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule
  ],
  exports:[
    MeterDataComponent,
    MeterReadingComponent,
    DashboardComponent
  ]
    
  
})
export class MeterModule { }
