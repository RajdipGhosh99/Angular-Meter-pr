import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { LoginRegisterService } from 'src/app/login-register.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges{

  meterName: any = ''
  meterReadings: any = []
  activeClass: string = "KWH"
  objId = ""

  constructor(private logRegSer: LoginRegisterService, private route: ActivatedRoute,private dataservice:DataService) {
this.setmetername()

  }



  ngOnInit(): void {
    this.objId = this.route.snapshot.params.id
    console.log(this.objId);
    this.meterValueByUnit("KWH")
  }

  setmetername(){
    this.dataservice.getMeterName().subscribe(d=>this.meterName=d)
  }

  goBack() {
    window.history.back();
  }


  meterValueByUnit(unit: string) {
    this.activeClass = unit
    this.logRegSer.getMeterValueByUnit(this.objId, unit).subscribe(d => {
      this.meterReadings = d


    })
    console.log("meterValueByUnit" + this.meterReadings);
  }

  deleteMeterReading(rId: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-3',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.logRegSer.deleteMeterReadingById(this.objId, rId).subscribe(d => {
          console.log("deleteMeterReading :" + d);
          // alert("Meter reading deleted sucessfully")
          this.meterValueByUnit(this.activeClass)
        })
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your reading has been deleted.',
          'success'
        )
      }
    })


  }
  ngOnChanges() {


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
