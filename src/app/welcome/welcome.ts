import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {

  role = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.role =
      this.authService.getRole()
      || '';
      console.log(
    'WELCOME ROLE:',
    this.role
  );
  }

  goToDashboard() {

    this.router.navigate(
      ['/dashboard']
    );
  }

  goToUserRoles() {

    this.router.navigate(
      ['/user-role']
    );
  }

 logout() {

  this.authService.logout();

  this.router.navigate(
    ['/login']
  );
}
}