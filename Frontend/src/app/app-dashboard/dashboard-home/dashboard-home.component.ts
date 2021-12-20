
import { Component, OnInit } from '@angular/core';

import { AppDashboardService } from 'src/app/services/app-dashboard.service';


@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  allMeters: any = []

  constructor(private appDashService: AppDashboardService) {
    this.getAllMeterData()
  }

 

  ngOnInit() { }

  getAllMeterData() {

    this.appDashService.allMeterData().subscribe(d => {
      this.allMeters = d
      console.log(this.allMeters);

    })
  }

}