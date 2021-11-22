import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm= new FormGroup({
    email:new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])

  })

  constructor() { }

  ngOnInit(): void {
  }

consoleForm(){
  console.log(this.signinForm.value)
}
}
