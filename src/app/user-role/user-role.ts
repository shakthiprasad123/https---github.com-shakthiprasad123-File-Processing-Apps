import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterLink
} from '@angular/router';

import {
  FileloadService
} from '../services/fileload';

@Component({
  selector: 'app-user-role',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl:
  './user-role.html',

  styleUrls:
  ['./user-role.css']
})

export class UserRole
implements OnInit {

  userRoleData: any[] = [];

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  showAddUserModal = false;
  selectedRole = 'User';
role = '';
  constructor(
    private service:
    FileloadService,

    private cdr:
    ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.role =
    localStorage.getItem('role')
    || '';

    this.loadData();
  }

  loadData() {

    this.service
      .getUsers()
      .subscribe((users: any) => {

        this.service
          .getRoles()
          .subscribe((roles: any) => {

            this.service
              .getUserRoles()
              .subscribe((mappings: any) => {

                this.userRoleData =
                  mappings
                  .map((mapping: any) => {

                    const user =
                      users.find(
                        (u: any) =>
                        u.usR_ID ===
                        mapping.usR_ID
                      );

                    const role =
                      roles.find(
                        (r: any) =>
                        r.rolE_ID ===
                        mapping.rolE_ID
                      );

                    if (!user || !role) {

                      return null;
                    }

                    return {

                      userId:
                      mapping.usR_ID,

                      name:
                      user.usR_FIRST_NAME +
                      ' ' +
                      user.usR_LAST_NAME,

                      email:
                      user.usR_EMAIL,

                      role:
                      role.rolE_NAME
                    };

                  })
                  .filter(
                    (x: any) =>
                    x !== null
                  );

                this.cdr.detectChanges();

              });
          });
      });
  }

  addUser() {

    const body = {

      USR_FIRST_NAME:
      this.firstName,

      USR_LAST_NAME:
      this.lastName,

      USR_EMAIL:
      this.email,

      USR_PSSWD:
      this.password,

      ROLE_NAME:
  this.selectedRole

      
    };
   

    this.service
      .createUser(body)
      .subscribe({

        next: () => {

          alert(
            'User Added Successfully'
          );

          this.loadData();

          this.firstName = '';
          this.lastName = '';
          this.email = '';
          this.password = '';
        },

        error: (err) => {

          console.log(err);

          alert(
            'Failed To Add User'
          );
        }
      });
  }

  changeRole(
  userId: number,
  roleName: string
) {

  let roleId = 4;

  if(roleName === 'Admin')
    roleId = 1;

  if(roleName === 'Administrator')
    roleId = 2;

  if(roleName === 'WPS')
    roleId = 3;

  if(roleName === 'User')
    roleId = 4;

  this.service
  .updateUserRole(
    userId,
    roleId
  )
  .subscribe({

    next: (res: any) => {

      console.log('SUCCESS', res);

      alert('Role Updated');

      this.loadData();
    },

    error: (err: any) => {

      console.log('ERROR', err);

      alert('Role Update Failed');
    }
  });
}
deleteUser(userId: number) {

  if (!confirm(
    'Are you sure you want to delete this user?'
  )) {
    return;
  }

  this.service
    .deleteUser(userId)
    .subscribe({

      next: () => {

        alert(
          'User Deleted Successfully'
        );

        this.loadData();
      },

      error: (err: any) => {

        console.log(err);

        alert(
          'Failed To Delete User'
        );
      }
    });
}
}