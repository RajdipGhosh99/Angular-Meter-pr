import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RoleService } from 'src/app/services/role.service';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  fullUserData: any = []

  allroleData: any = []


  constructor(private roleService: RoleService, private dataService: DataService, private router: Router) {
    this.allRoleData()

  }

  ngOnInit(): void {
    this.getUserData()

  }

  getUserData() {
    this.dataService.getUserData().subscribe(d => {
      this.fullUserData = d
      this.roleFrom.controls.created_by.setValue(d.user_name)
    })
  }

  allRoleData() {
    this.roleService.allRole().subscribe(d => {
      this.allroleData = d

    })
  }



  roleFrom = new FormGroup({
    role_name: new FormControl("", [Validators.required]),
    created_by: new FormControl(""),
    checkbox1: new FormControl(""),
    checkbox2: new FormControl(""),
    checkbox3: new FormControl(""),
    checkbox4: new FormControl(""),
  })

  postFrom() {

    let customRoleFrom: any = {
      role_name: this.roleFrom.value.role_name,
      module_name: [],
      created_by: this.roleFrom.value.created_by

    }
    if (this.roleFrom.value.checkbox1) {
      customRoleFrom.module_name = [...customRoleFrom.module_name, "meter"]

    }
    if (this.roleFrom.value.checkbox2) {
      customRoleFrom.module_name = [...customRoleFrom.module_name, "dashboard"]

    }
    if (this.roleFrom.value.checkbox3) {
      customRoleFrom.module_name = [...customRoleFrom.module_name, "user"]

    }
    if (this.roleFrom.value.checkbox4) {
      customRoleFrom.module_name = [...customRoleFrom.module_name, "role"]

    }


    console.log(customRoleFrom);
    this.roleService.addRole(customRoleFrom).subscribe(d => {
      this.allRoleData()
      alert("Role creation sucessfull")
      this.roleFrom.reset()

    }, (e) => {
      alert(e)
    })


  }

 roleId:any
  editButtonClick(value: any) {
    this.roleId=value._id

    this.roleFrom.controls.role_name.setValue(value.role_name)
    this.roleFrom.controls.created_by.setValue(value.created_by)

    if (value.module_name.filter((v: any) => { return v == "meter" }).length == 1) {
      this.roleFrom.controls.checkbox1.setValue(true)
    } else { this.roleFrom.controls.checkbox1.setValue(false)}

    if (value.module_name.filter((v: any) => { return v == "dashboard" }).length == 1) {
      this.roleFrom.controls.checkbox2.setValue(true)
    } else { this.roleFrom.controls.checkbox2.setValue(false)}

    if (value.module_name.filter((v: any) => { return v == "user" }).length == 1) {
      this.roleFrom.controls.checkbox3.setValue(true)
    } else { this.roleFrom.controls.checkbox3.setValue(false)}

    if (value.module_name.filter((v: any) => { return v == "role" }).length == 1) {
      this.roleFrom.controls.checkbox4.setValue(true)
    } else { this.roleFrom.controls.checkbox4.setValue(false)}



  }

  updateRole(){
    let customRoleFrom2: any = {
      role_name: this.roleFrom.value.role_name,
      module_name: [],
      created_by: this.roleFrom.value.created_by

    }
    if (this.roleFrom.value.checkbox1) {
      customRoleFrom2.module_name = [...customRoleFrom2.module_name, "meter"]

    }
    if (this.roleFrom.value.checkbox2) {
      customRoleFrom2.module_name = [...customRoleFrom2.module_name, "dashboard"]

    }
    if (this.roleFrom.value.checkbox3) {
      customRoleFrom2.module_name = [...customRoleFrom2.module_name, "user"]

    }
    if (this.roleFrom.value.checkbox4) {
      customRoleFrom2.module_name = [...customRoleFrom2.module_name, "role"]

    }

    console.log(customRoleFrom2);
    console.log(this.roleId);
    
    

    this.roleService.UpdateRole(customRoleFrom2, this.roleId).subscribe(d=>{
      this.allRoleData()
      alert("Role updated Sucessfully")
      this.roleFrom.reset
    },(e)=>{alert(alert(e))})
  }

  deleteRole(val: any) {
    let confirmbox = window.confirm("Are You sure")
    if (confirmbox) {
      this.roleService.deleteRole(val).subscribe(d => {
        this.allRoleData()
        alert("Deleted Sucessfully")
      }, (e) => alert(e))
    }
  }

}
