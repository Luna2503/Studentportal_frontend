import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminApiService } from '../services/admin-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  constructor(private api: AdminApiService, private router: Router) { }

  adminLogin() {
    // console.log(this.email);
    // console.log(this.password);

    if (!this.email || !this.password) {
      Swal.fire({
        title: "Ooops...",
        text: "Please the form completely",
        icon: "info"
      });

    }
    else {
      this.api.authorization().subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.email == this.email && res.password == this.password) {
            Swal.fire({
              title: "Success",
              text: "Successfully logged in",
              icon: "success"
            });
            this.api.updateData({data: true})
            localStorage.setItem('name', res.name)
            // navigate
            this.router.navigateByUrl('dashboard')
          }
          else {
            Swal.fire({
              title: "error occured",
              text: "Invalid email or password",
              icon: "error"
            });
          }

        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }
}
