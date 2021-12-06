
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/login-register.service';
import { DataService } from 'src/app/services/data.service';

import Swal from 'sweetalert2'



@Component({
  selector: 'app-meter-data',
  templateUrl: './meter-data.component.html',
  styleUrls: ['./meter-data.component.css']
})
export class MeterDataComponent implements OnInit {

  meterReadings: any = []
  clickReadingId: string = ''
  addReadingIdValue:string=""
  userData:any
  isadmin:boolean=false
  dashBoardPermission:boolean=false


  count: number = 0;


  updateForm = new FormGroup({
    mName: new FormControl("", [Validators.required]),
  })


  addReading =new FormGroup({
     rValue: new FormControl("",Validators.required),
    rUnit: new FormControl("KWH",Validators.required),
    rDate: new FormControl("",Validators.required),
    rTime: new FormControl("",Validators.required)
  })


  constructor(private logRegSer: LoginRegisterService, private dataservice: DataService, private router:Router) { }

  ngOnInit(): void {
    this.getUserData()

    this.dataservice.getData().subscribe((data) => {
      this.meterReadings = data
    })
    this.getData()
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

getUserData(){
  this.dataservice.getUserData().subscribe(d=>{
    this.userData=d
    console.log( "bhbjdbjnbj"+ this.userData);
    
    this.isadmin = d.isAdmin
    console.log("gbjhbgdhbbbsbshb");
    

    let val1 =  d.role_coll.filter((v: any) =>{
       return v.module_name == "dashboard"
      
    })
    
    console.log(val1);
    
    if (val1.length == 1) {
      this.dashBoardPermission = true
    }else{
      this.dashBoardPermission = false
    }
  })
}


  upDate(objId: any) {
    let uD = this.updateForm.value
    console.log("update oblect" + objId);
    this.updateForm.reset()
    this.logRegSer.updateData(objId, uD).subscribe((data) => {
      console.log(data);
      let dataarr: any = this.meterReadings.map((val2: any) => {

        if (val2._id === objId) {
          return data
        } else {
          return val2
        }
      })
      this.dataservice.setalldata(dataarr)

      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Meter updated successfully'
      })

    })

  }

  storeIdandGo(iD:any,mName:any){
    console.log(iD);
    console.log(mName);
    this.dataservice.setMeterName(mName)
    
    this.router.navigate(['/meter/dashboard',iD])
  }

  editBtnClick(reading: any) {
    console.log(reading);
    this.clickReadingId = reading._id
    this.updateForm.controls.mName.setValue(reading.mName)
    
  }


  addValueToMeter( ID:any){
   this.logRegSer.addValueToMeter(ID,this.addReading.value).subscribe((data)=>{
     console.log(data);
     const Toast = Swal.mixin({
       toast: true,
       position: 'top',
       showConfirmButton: false,
       timer: 2500,
       timerProgressBar: true,
       didOpen: (toast) => {
         toast.addEventListener('mouseenter', Swal.stopTimer)
         toast.addEventListener('mouseleave', Swal.resumeTimer)
       }
     })

     Toast.fire({
       icon: 'success',
       title: 'Reading added successfully'
     })
     
   })
   this.addReading.reset()

  }

  deleteReading(val: any) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-3 ',
        cancelButton: 'btn btn-danger '
        
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel!   ',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.logRegSer.deleteData(val).subscribe((data) => {
          console.log(data);
          let dataarr = this.meterReadings.filter((val2: any) => {

            return val2._id != val
          })

          this.dataservice.setalldata(dataarr)
        })
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Meter has been deleted.',
          'success'
        )
      }
    })
    console.log(swalWithBootstrapButtons);

    
    
  }

  getData() {
    this.logRegSer.getAllData().subscribe((data) => {
      console.log(data);
      this.dataservice.setalldata(data)
    }, (error) => {
      console.log('Err:' + error);

    })
  }
  consoleF(){
    console.log(this.addReading.value);
    
  }

  addReadingClick(Uid:any){
    this.addReadingIdValue=Uid
    console.log(this.addReadingIdValue);

    
  }


}