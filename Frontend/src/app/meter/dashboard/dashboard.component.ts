import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginRegisterService } from 'src/app/login-register.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  meterName: any = ''
  mainMeterReadings: any = []
  meterReadings: any = []

  constructor(private logRegSer: LoginRegisterService, private route: ActivatedRoute) { }
  objId = ""

  ngOnInit(): void {
    this.objId = this.route.snapshot.params.id
    console.log(this.objId);
    this.getmetervalue()
   

  }
  goBack() {
  window.history.back();
  }

  getmetervalue() {
    this.logRegSer.getMeterValue(this.objId).subscribe((d: any) => {
      this.mainMeterReadings = d.mReading
      this.meterName=d.mName
      console.log(this.mainMeterReadings);
      
      this.getmetervaluebykwh()

    }, (error) => {
      console.log(error);

    })
  }
 

  getmetervaluebykwh() {
    this.meterReadings=[]
    for (let i = 0; i < this.mainMeterReadings.length; i++) {
      if ("KWH" == this.mainMeterReadings[i].rUnit) {
        this.meterReadings.push(this.mainMeterReadings[i])
        console.log(this.meterReadings);


      }
    }

  }

  getmetervaluebyvolt() {
    this.meterReadings = []
    for (let i = 0; i < this.mainMeterReadings.length; i++) {
      if ("Volt" == this.mainMeterReadings[i].rUnit) {
        this.meterReadings.push(this.mainMeterReadings[i])
        console.log(this.meterReadings);
      }
    }

  }

  getmetervaluebyamp() {
    this.meterReadings = []
    for (let i = 0; i < this.mainMeterReadings.length; i++) {
      if ("Amp." == this.mainMeterReadings[i].rUnit) {
        this.meterReadings.push(this.mainMeterReadings[i])
        console.log(this.meterReadings);
      }

    }
  }

  getmetervaluebypf() {
    this.meterReadings = []
    for (let i = 0; i < this.mainMeterReadings.length; i++) {
      if ("PF" == this.mainMeterReadings[i].rUnit) {
        this.meterReadings.push(this.mainMeterReadings[i])
        console.log(this.meterReadings);
      }

    }

  }






}
