import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  searchKey: any = "";
  allStudentsData: any = [];
  p: number = 1;
  constructor(private api: AdminApiService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }
  getAllStudents() {
    this.api.getAllStudentsApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allStudentsData = res;
      },
      error: (res: any) => {
        Swal.fire({
          title: "warning",
          text: "An error occured in adding student",
          icon: "error"
        });
      }
    })
  }

  deleteStudent(id: any) {
    this.api.deleteStudentApi(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Deleted",
          text: "Student deleted successfull",
          icon: "success"
        });
        this.getAllStudents();
      },
      error: (res: any) => {
        Swal.fire({
          title: "warning",
          text: "An error occured in adding student",
          icon: "error"
        });
      }
    })
  }

  sortbyId() {
    this.allStudentsData.sort((a: any, b: any) => a.id - b.id)
  }

  sortbyName() {
    this.allStudentsData.sort((a: any, b: any) => a.name.localeCompare(b.name))
  }


  generatePdf() {
    const pdf = new jsPDF();
    let head = [['Id', 'Student Name', 'Email', 'Status']];
    let body: any = [];
    this.allStudentsData.forEach((item : any) => {
      if(item.id !=1){
        body.push([item.id, item.name, item.email, item.status])
      }
    });

    pdf.text('Student Details', 10, 10);
    autoTable(pdf, {head: head, body: body});
    pdf.output('dataurlnewwindow')
    pdf.save('Student-Details.pdf')
  }
}
