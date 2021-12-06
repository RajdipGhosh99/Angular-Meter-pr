import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddmeterComponent } from './addmeter/addmeter.component';
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
    },
    {
        path:"add",
        component: AddmeterComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MeterRoutingModule { }