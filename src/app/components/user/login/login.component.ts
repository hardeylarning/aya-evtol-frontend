import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly loading$ = new BehaviorSubject<boolean>(false);

  email:string = ''
  password:string = ''

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

  

  login() {
    this.loading$.next(true)
    this.userService.login(this.email, this.password).subscribe({
      next: data => {
        if (data.status === 'success') {
          this.loading$.next(false)
          localStorage.setItem('userId', data.data.userId)
          localStorage.setItem('userName', data.data.fullname)
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('role', data.data.role)
          localStorage.setItem('email', this.email)
          this.router.navigate(['/medicines'])
        }
        else {
          console.log('Data:', data);
          this.loading$.next(false)
          this.tinyAlert(data.message)
        }
      },
      error: err => {
        // console.log('Data:', err);
        this.loading$.next(false)
        this.tinyAlert("Network Error! Kindly check your network")
      }

    })
}


}
