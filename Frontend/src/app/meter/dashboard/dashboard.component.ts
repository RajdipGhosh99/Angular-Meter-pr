import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginRegisterService } from 'src/app/login-register.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  meterfuldata :any=''
  meterReadings:any=[]

  constructor(private logRegSer: LoginRegisterService, private route:ActivatedRoute) { }
  objId=""

  ngOnInit(): void {
    this.objId = this.route.snapshot.params.id
    console.log(this.objId);
   this.getmetervalue()

  }


  getmetervalue(){
    this.logRegSer.getMeterValue(this.objId).subscribe((d:any)=>{
      this.meterReadings = d.mReading
      console.log(this.meterReadings);
      

    },(error)=>{
      console.log(error);
      
    })
  }

}
