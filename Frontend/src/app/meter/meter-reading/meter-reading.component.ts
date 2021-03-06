import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/login-register.service';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-meter-reading',
  templateUrl: './meter-reading.component.html',
  styleUrls: ['./meter-reading.component.css']
})

export class MeterReadingComponent implements OnInit {
  time: any = ""
  date: any = ""

  userData: any = []
  isadmin: boolean = false

  meterPermission: boolean = false

  readingForm = new FormGroup({
    mName: new FormControl("", [Validators.required]),
    mDate: new FormControl("",),
    mTime: new FormControl("",)
  })

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }


  constructor(private route: Router, private logRegSer: LoginRegisterService, private dataservice: DataService, private router:Router) { }

  ngOnInit(): void {
    this.getUserData()
  }


  getUserData() {
    this.dataservice.getUserData().subscribe(d => {
      this.userData = d
      this.isadmin = d.isAdmin
      let val1 = d.role_coll.filter((v: any) => {
        v.module_name == "meter"
      })
      if (val1.length == 1) {
        this.meterPermission = true
      } else {
        this.meterPermission = false
      }
    })
  }


  consoleF() {
    this.date = ""
    this.date = new Date().toISOString().split('T')[0]
    console.log(this.date);

    this.readingForm.controls.mDate.setValue(this.date)


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

    this.readingForm.controls.mTime.setValue(convertTime(this.time))
    console.log(this.readingForm.value);
    this.readingForm.reset




  }



  sendData() {

    this.date = ""
    this.date = new Date().toISOString().split('T')[0]
    console.log(this.date);

    this.readingForm.controls.mDate.setValue(this.date)


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

    this.readingForm.controls.mTime.setValue(convertTime(this.time))
    let val = this.readingForm.value
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

    }, (error) => {
      console.log("Err:" + error)
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
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
    
    this.readingForm.reset

  }



}