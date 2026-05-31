import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  userid = '';

  password = '';

  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {

    const body = {

      USR_EML: this.userid,

      USR_PSWD: this.password
    };

    this.http.post<any>(
      'http://localhost:5224/auth/login',
      body
    )
    .subscribe({

      next: (response) => {

        console.log('LOGIN RESPONSE', response);

        this.authService.saveToken(
          response.token
        );
        localStorage.setItem(
  'role',
  response.roles[0]
);
        this.errorMessage = '';

        this.router.navigate(
          ['/welcome']
        );
      },

      error: (err) => {

        console.log(err);

        this.errorMessage =
          'Invalid userid/password';
      }
    });
  }

  ngOnInit() {

    if (
      this.authService.isLoggedIn()
    ) {

      this.router.navigate(
        ['/welcome']
      );
    }
  }
}