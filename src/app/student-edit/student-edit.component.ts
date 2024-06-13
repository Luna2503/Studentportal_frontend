import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from '../services/admin-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  student: any = {}
  constructor(private route: ActivatedRoute, private api: AdminApiService, private router : Router) { }  // AR used to get id from url

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      // console.log(res);
      const { id } = res;
      this.getStdbyId(id);
    })
  }

  getStdbyId(id: any) {
    this.api.getStdDetailsbyId(id).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.student = res;
      },
      error: (res: any) => {
        Swal.fire({
          title: "warning",
          text: "An error occured on edit student",
          icon: "error"
        });
      }
    })
  }

  updateStudent(id: any) {
    this.api.updateStudentApi(id, this.student).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Success",
          text: "Student updated successfully",
          icon: "success"
        });
        this.router.navigateByUrl('students')
      },
      error: (res: any) => {
        Swal.fire({
          title: "warning",
          text: "An error occured on edit student",
          icon: "error"
        });
      }
    })
  }

  restoreValues(id:any){
    this.getStdbyId(id)
  }

}
