
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/login-register.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-meter-data',
  templateUrl: './meter-data.component.html',
  styleUrls: ['./meter-data.component.css']
})
export class MeterDataComponent implements OnInit {

  meterReadings: any = []
  clickReadingId: string = ''
  addReadingIdValue:string=""


  count: number = 0;


  updateForm = new FormGroup({
    mName: new FormControl("", [Validators.required]),
    mDate: new FormControl("", [Validators.required]),
    mTime: new FormControl("", [Validators.required])
  })


  addReading =new FormGroup({
     rValue: new FormControl("",Validators.required),
    rUnit: new FormControl("KWH",Validators.required),
    rDate: new FormControl("",Validators.required),
    rTime: new FormControl("",Validators.required)
  })


  constructor(private logRegSer: LoginRegisterService, private dataservice: DataService, private router:Router) { }

  ngOnInit(): void {


    this.dataservice.getData().subscribe((data) => {
      this.meterReadings = data
    })
    this.getData()
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
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

    })

  }

  storeIdandGo(val:any){
    console.log(val);
    this.router.navigate(['/meter-reading-value',val]) 
  }

  editBtnClick(reading: any) {
    console.log(reading);
    this.clickReadingId = reading._id
    this.updateForm.controls.mName.setValue(reading.mName)
    this.updateForm.controls.mDate.setValue(reading.mDate)
    this.updateForm.controls.mTime.setValue(reading.mTime)
  }


  addValueToMeter( ID:any){
   this.logRegSer.addValueToMeter(ID,this.addReading.value).subscribe((data)=>{
     console.log(data);
     alert("Meter Reading Added Sucessfull")
     
   })
   this.addReading.reset()

  }

  deleteReading(val: any) {

    const confirmWindow = window.confirm("Are you sure??")
    if (confirmWindow) {


      this.logRegSer.deleteData(val).subscribe((data) => {
        console.log(data);
        let dataarr = this.meterReadings.filter((val2: any) => {

          return val2._id != val
        })

        this.dataservice.setalldata(dataarr)
alert("Meter deleted sucessfully")
      })
    }
    
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