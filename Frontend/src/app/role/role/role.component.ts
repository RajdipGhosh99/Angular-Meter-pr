import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit, OnChanges {

  fullUserData: any = []

  allroleData: any = []

  checked: any = []


  constructor(private roleService: RoleService, private dataService: DataService, private router: Router) {


  }

  ngOnInit(): void {
    this.allRoleData()
    this.getUserData()
    this.roleFrom.controls.created_by.setValue(this.fullUserData.user_name)



  }

  toggleDataUpdate() {
    this.allroleData.forEach((element: any) => {
      this.checked.push(element.status == "active" ? true : false)
    });

  }

  toggle(oId: any, index: number) {
    this.checked[index] = !this.checked[index]
    if (this.checked[index]) {
      console.log("if is called",oId,index);
      
      const data: object = { "status": "active", "email": this.fullUserData.email, "role_id": oId }
      console.log(data);
      this.roleService.changeRoleStatus(oId, data).subscribe(d => { 
        console.log(this.checked);
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
          title: 'Status Updated Sucessfully'
        })
        
      },(e)=>{alert(e)})
    } else {
      console.log("else is called", oId, index);
      const data: object = { "status": "inactive", "email": this.fullUserData.email, "role_id": oId  }
      console.log(data);
      this.roleService.changeRoleStatus(oId, data).subscribe(d => {
        console.log(this.checked);
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
          title: 'Status Updated Sucessfully'
        })
        
        
      })
    }
    console.log(this.checked);
  }

  ngOnChanges() {

  }

  getUserData() {
    this.dataService.getUserData().subscribe(d => {
      this.fullUserData = d
      this.roleFrom.controls.created_by.setValue(d.user_name)
    })
  }

  allRoleData() {
    this.roleService.all_active_inactive().subscribe(d => {
      this.allroleData = d
      this.toggleDataUpdate()

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

  addRoleButton() {
    this.roleFrom.controls.created_by.setValue(this.fullUserData.user_name)

  }

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
      this.roleFrom.reset()
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
        title: 'Role creation successfull'
      })


    }, (e) => { alert(e) })


  }

  roleId: any
  editButtonClick(value: any) {
    this.roleId = value._id

    this.roleFrom.controls.role_name.setValue(value.role_name)
    this.roleFrom.controls.created_by.setValue(value.created_by)

    if (value.module_name.filter((v: any) => { return v == "meter" }).length == 1) {
      this.roleFrom.controls.checkbox1.setValue(true)
    } else { this.roleFrom.controls.checkbox1.setValue(false) }

    if (value.module_name.filter((v: any) => { return v == "dashboard" }).length == 1) {
      this.roleFrom.controls.checkbox2.setValue(true)
    } else { this.roleFrom.controls.checkbox2.setValue(false) }

    if (value.module_name.filter((v: any) => { return v == "user" }).length == 1) {
      this.roleFrom.controls.checkbox3.setValue(true)
    } else { this.roleFrom.controls.checkbox3.setValue(false) }

    if (value.module_name.filter((v: any) => { return v == "role" }).length == 1) {
      this.roleFrom.controls.checkbox4.setValue(true)
    } else { this.roleFrom.controls.checkbox4.setValue(false) }



  }

  updateRole() {
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



    this.roleService.UpdateRole(customRoleFrom2, this.roleId).subscribe(d => {
      this.allRoleData()
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
        title: 'Role update successfully'
      })
      this.roleFrom.reset
    }, (e) => { alert(alert(e)) })
  }

  deleteRole(oId: any, val: string) {
    const data: object = { "status": val }

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
      cancelButtonText: 'Cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.roleService.changeRoleStatus(oId, data).subscribe(d => {
          this.allRoleData()
        }, (e) => alert(e))


        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Meter has been deleted.',
          'success'
        )
      }
    })
  }

}
