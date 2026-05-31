import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import {
  CommonModule
} from '@angular/common';

import {
  FileloadService
} from '../services/fileload';

@Component({
  selector: 'app-user-role',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './user-role.html',
  styleUrls: ['./user-role.css']
})
export class UserRole implements OnInit {

  userRoleData: any[] = [];

  constructor(
    private service: FileloadService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
}