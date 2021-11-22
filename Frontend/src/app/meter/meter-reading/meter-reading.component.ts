import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/login-register.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-meter-reading',
  templateUrl: './meter-reading.component.html',
  styleUrls: ['./meter-reading.component.css']
})

export class MeterReadingComponent implements OnInit {

  readingForm=new FormGroup({
    mName: new FormControl("",[Validators.required]),
    mDate: new FormControl("", [Validators.required]),
    mTime: new FormControl("", [Validators.required])
  })

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }


  constructor(private route:Router, private logRegSer: LoginRegisterService,private dataservice:DataService) { }

  ngOnInit(): void {
  }
  consoleF(){
    console.log(this.readingForm.value);
    
  }

  goto(){
    this.route.navigate(["/meter-table"])
  }
 
  
  sendData(){
    let val = this.readingForm.value
    this.logRegSer.postData(val).subscribe((data)=>{
      console.log(data);
      alert("Meter reading created sucessfully")
      this.dataservice.setData(data)
      
      this.readingForm.reset()
    },(error)=>{
      console.log("Err:"+error)
    })
   
  }
}