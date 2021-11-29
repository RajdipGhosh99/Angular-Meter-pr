import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeterHomeComponent } from './meter-home/meter-home.component';

const routes: Routes = [
    {
        path: "",
        component:MeterHomeComponent
    },
    {
        path:'dashboard/:id',
        component:DashboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MeterRoutingModule { }