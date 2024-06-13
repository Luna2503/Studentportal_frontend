import { Component } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent {
  constructor(private api: AdminApiService, private router:Router) { }
  student: any = {
    id: '',
    name: '',
    email: '',
    status: ''
  }

  addStudent() {
    console.log(this.student);
    const { id, name, email, status } = this.student;

    if (!id || !name || !email || !status) {
      Swal.fire({
        title: "Warning",
        text: "please fill the form completely",
        icon: "info"
      });
    }
    else {
      this.api.addStudentApi(this.student).subscribe({
        next:(res:any)=>{
          console.log(res);
          Swal.fire({
            title: "Success",
            text: "Successfully logged in",
            icon: "success"
          });
          this.router.navigateByUrl('students')
        },
        error:(res:any)=>{
          Swal.fire({
            title: "warning",
            text: "An error occured in adding student",
            icon: "error"
          });
        }
      })
    }

  }

  clearForm(){
    this.student= {
      id: '',
      name: '',
      email: '',
      status: ''
    }
  }
}
