import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signupForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    mobile: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    skills: new FormArray([
      new FormControl("",Validators.required)
    ]),

    address: new FormControl('')


  })
  getControls() {
    return (this.signupForm.get('skills') as FormArray).controls;
  }

  consoleForm() {
    console.log(this.signupForm.value);

  }
  addSkills() {
    (<FormArray>this.signupForm.get("skills")).push(new FormControl(""))
  }
  delSkills(index:any) {
    (<FormArray>this.signupForm.get("skills")).removeAt(index)
  }

  
  demoF() {
    console.log("Works");

  }

  constructor() { }

  ngOnInit(): void {
  }

}
