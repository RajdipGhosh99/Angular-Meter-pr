import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginRegisterService } from 'src/app/login-register.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnChanges {
  meterName: any = ''
  meterReadings: any = []
  activeClass: string = "KWH"

  constructor(private logRegSer: LoginRegisterService, private route: ActivatedRoute) { }
  objId = ""

  ngOnInit(): void {
    this.objId = this.route.snapshot.params.id
    console.log(this.objId);
   this.meterValueByUnit("KWH")


  }
  goBack() {
    window.history.back();
  }


  meterValueByUnit(unit: string) {
    this.activeClass=unit
    this.logRegSer.getMeterValueByUnit(this.objId, unit).subscribe(d => {
      this.meterReadings = d
      console.log("ghjhjhgb" , d);
      

    })
    console.log("meterValueByUnit" +this.meterReadings);
  }

  deleteMeterReading(rId:any){
    let windowConfirm= window.confirm("Are you sure")
    if (windowConfirm) {
      this.logRegSer.deleteMeterReadingById(this.objId, rId).subscribe(d => {
        console.log("deleteMeterReading :" + d);
        // alert("Meter reading deleted sucessfully")
        this.meterValueByUnit(this.activeClass)
      })
      
    }
    
    

  }
  ngOnChanges(){
    console.log("dashboard on chang es is called");
    
  }





  // deleteMeterReadingById(){

  // }

  // getmetervalue() {
  //   this.logRegSer.getMeterValue(this.objId).subscribe((d: any) => {
  //     this.mainMeterReadings = d.mReading
  //     this.meterName=d.mName
  //     console.log(this.mainMeterReadings);

  //     this.getmetervaluebykwh()

  //   }, (error) => {
  //     console.log(error);

  //   })
  // }


  // getmetervaluebykwh() {

  //   this.meterReadings=[]
  //   for (let i = 0; i < this.mainMeterReadings.length; i++) {
  //     if ("KWH" == this.mainMeterReadings[i].rUnit) {
  //       this.meterReadings.push(this.mainMeterReadings[i])
  //       console.log(this.meterReadings);


  //     }
  //   }
  //   this.activeClass = "kwh"

  // }

  // getmetervaluebyvolt() {

  //   this.meterReadings = []
  //   for (let i = 0; i < this.mainMeterReadings.length; i++) {
  //     if ("Volt" == this.mainMeterReadings[i].rUnit) {
  //       this.meterReadings.push(this.mainMeterReadings[i])
  //       console.log(this.meterReadings);
  //     }
  //   }
  //   this.activeClass = "volt"

  // }

  // getmetervaluebyamp() {

  //   this.meterReadings = []
  //   for (let i = 0; i < this.mainMeterReadings.length; i++) {
  //     if ("Amp." == this.mainMeterReadings[i].rUnit) {
  //       this.meterReadings.push(this.mainMeterReadings[i])
  //       console.log(this.meterReadings);
  //     }
  //     this.activeClass = "amp"

  //   }
  // }

  // getmetervaluebypf() {

  //   this.meterReadings = []
  //   for (let i = 0; i < this.mainMeterReadings.length; i++) {
  //     if ("PF" == this.mainMeterReadings[i].rUnit) {
  //       this.meterReadings.push(this.mainMeterReadings[i])
  //       console.log(this.meterReadings);
  //     }

  //   }
  //   this.activeClass = "pf"

  // }






}
