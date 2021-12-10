import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserdataService } from 'src/app/services/userdata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userFullData: any = []
  userData: any = []
  oId: any = ""
  loginStatus: boolean = false
  roleOptions: any = []

  checked: any = []


  constructor(private dataSer: DataService, private userService: UserdataService, private router: Router) {
    this.loginStatusFunc()
    this.throwTologin()
  }

  ngOnInit(): void {
    this.dataSer.getUserData().subscribe(d => {
      this.userFullData = d
      console.log("vggvgvvbbbujbh");

      console.log(d);
    })
    this.getUserData()
    this.addUser.controls.created_by.setValue(this.userFullData.user_name)
  }

  toggleDataUpdate() {
    this.userData.forEach((element: any) => {
      this.checked.push(element.status == "active" ? true : false)
    });

  }

  toggle(oId: any, index: number) {
    this.checked[index] = !this.checked[index]
    if (this.checked[index]) {
      console.log("if is called", oId, index);
      const data: object = { "status": "active",
        "email": this.userFullData.email, "role_id":oId }
      console.log(data);
      this.userService.updateStatus(oId,data).subscribe(d=>{
        console.log(d);
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

    } else {
      console.log("else is called", oId, index);
      const data: object = { "status": "inactive", "email": this.userFullData.email, "role_id": oId}
      console.log(data);
      this.userService.updateStatus(oId, data).subscribe(d => {
        console.log(d);
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


  getAllRoles() {
    this.userService.getRoleOptions().subscribe(d => {
      this.roleOptions = d

    }, err => alert("err"))
  }


  loginStatusFunc() {
    this.dataSer.getLoginStatus().subscribe(d => {
      this.loginStatus = d
    })

  }

  throwTologin() {
    if (this.loginStatus == false) {
      this.router.navigateByUrl("/user/login")

    }
  }

  addUser = new FormGroup({
    user_name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    role_coll_id: new FormControl(""),
    created_by: new FormControl("")

  })

  getUserId(data: any) {
    this.oId = data._id
    console.log(this.oId);
    this.getAllRoles()
    this.addUser.controls.created_by.setValue(this.userFullData.user_name)
    this.addUser.controls.user_name.setValue(data.user_name)
    this.addUser.controls.email.setValue(data.email)
    this.addUser.controls.password.setValue(data.password)
    this.addUser.controls.role_coll_id.setValue(data.role_coll_id)

  }

  addUserForm() {

    console.log(this.addUser.value);

    this.userService.addUser(this.addUser.value).subscribe(d => {
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
        title: 'User added successfully'
      })
      this.getUserData()
      this.addUser.reset()
    })
  }

  getUserData() {
    this.userData = []
    this.userService.allUser().subscribe(d => {
      this.userData = d
      console.log(d);
      this.toggleDataUpdate()


    })
  }

  deleteUser(oId: any) {
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
        const data: object = { "status": "delete" }
        this.userService.updateStatus(oId,data).subscribe(d => {
          this.getUserData()
          console.log(d);
          

        })
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        )
      }
    })



  }

  updateForm() {
    console.log(this.addUser.value);

    this.userService.updateUser(this.oId, this.addUser.value).subscribe(d => {
      this.getUserData()
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
        title: 'User updated successfully'
      })
    }, (e) => {
      alert(e)
    })
    this.addUser.reset()

  }




}
