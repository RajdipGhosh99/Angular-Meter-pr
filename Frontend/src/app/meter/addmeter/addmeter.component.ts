import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/login-register.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-addmeter',
  templateUrl: './addmeter.component.html',
  styleUrls: ['./addmeter.component.css']
})
export class AddmeterComponent implements OnInit {

  time: any = ""
  date: any = ""

  meterAdd = new FormGroup({
    mName: new FormControl("", [Validators.required]),
    mDate: new FormControl("",),
    mTime: new FormControl("",)
  })

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }


  constructor(private route: Router, private logRegSer: LoginRegisterService, private dataservice: DataService ,private router:Router) { }

  ngOnInit(): void {
  }


  consoleF() {
    this.date = ""
    this.date = new Date().toISOString().split('T')[0]
    console.log(this.date);

    this.meterAdd.controls.mDate.setValue(this.date)


    this.time = ""
    this.time = new Date().toLocaleTimeString();
    const convertTime = (timee: any) => {
      const [time, modifier] = timee.split(' ');
      let [hours, minutes] = time.split(':');
      if (hours === '12') {
        hours = '00';
      }
      if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }
      return `${hours}:${minutes}`;
    };

    console.log(convertTime(this.time));

    this.meterAdd.controls.mTime.setValue(convertTime(this.time))
    console.log(this.meterAdd.value);
    this.meterAdd.reset




  }

  goto() {
    this.route.navigate(["/meter-table"])
  }


  sendData() {

    this.date = ""
    this.date = new Date().toISOString().split('T')[0]
    console.log(this.date);

    this.meterAdd.controls.mDate.setValue(this.date)


    this.time = ""
    this.time = new Date().toLocaleTimeString();
    const convertTime = (timee: any) => {
      const [time, modifier] = timee.split(' ');
      let [hours, minutes] = time.split(':');
      if (hours === '12') {
        hours = '00';
      }
      if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }
      return `${hours}:${minutes}`;
    };

    console.log(convertTime(this.time));

    this.meterAdd.controls.mTime.setValue(convertTime(this.time))
    let val = this.meterAdd.value
    this.logRegSer.postData(val).subscribe((data) => {
      console.log(data);
      this.dataservice.setData(data)
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
        title: 'Meter added successfully'
      })
      
      setTimeout(()=>{
        this.router.navigate(["/meter"])
      },1500)

    }, (error) => {
      console.log("Err:" + error)
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: error
      })
    })

    this.meterAdd.reset

  }

}
