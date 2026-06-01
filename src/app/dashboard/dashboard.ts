import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';
import {
  RouterLink
} from '@angular/router';
import {
  FileloadService
} from '../services/fileload';

import {
  AuthService
} from '../services/auth';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './dashboard.html',

  styleUrls: ['./dashboard.css']
})

export class Dashboard
implements OnInit, AfterViewInit {
  role = '';

  files: any[] = [];

  filteredFiles: any[] = [];
  selectedErrors = '';
  selectedFile:
  File | null = null;

  searchText = '';

  isLoading = false;

  currentPage = 1;

  itemsPerPage = 5;

  constructor(

    private fileService:
    FileloadService,

    private router:
    Router,

    private authService:
    AuthService,

    private cdr:
    ChangeDetectorRef

  ) {}

  // PAGE LOAD
  ngOnInit(): void {}

  ngAfterViewInit(): void {

    this.loadFiles();
    this.role =
    localStorage.getItem('role')
    || '';
  }

  // LOAD FILES
  loadFiles() {

    this.isLoading = true;

    this.fileService
      .getFiles()
      .subscribe({

        next: (res: any) => {

          console.log(
            'NEW DATA:',
            res
          );

          // CLEAR OLD DATA
          this.files = [];

          this.filteredFiles = [];

          // FORCE NEW REFERENCE
          setTimeout(() => {

            this.files =
              JSON.parse(
                JSON.stringify(res)
              );

            this.filteredFiles =
              [...this.files];

            this.isLoading = false;

            // FORCE UI UPDATE
            this.cdr.detectChanges();

          }, 0);
        },

        error: (err: any) => {

          console.log(
            'LOAD ERROR:',
            err
          );

          this.isLoading = false;

          this.cdr.detectChanges();
        }
      });
  }

  // SEARCH
  searchFiles() {

    this.filteredFiles =
      this.files.filter(file =>

        file.filE_NAME
        ?.toLowerCase()
        .includes(
          this.searchText
          .toLowerCase()
        )
      );

    this.currentPage = 1;
  }

  // PAGINATION
  get paginatedFiles() {

    const start =
      (this.currentPage - 1)
      * this.itemsPerPage;

    return this.filteredFiles.slice(
      start,
      start + this.itemsPerPage
    );
  }

  // FILE SELECT
  onFileSelected(event: any) {

    this.selectedFile =
      event.target.files[0];
  }

  // UPLOAD FILE
  uploadFile() {

    if (!this.selectedFile) {

      alert(
        'Please select file'
      );

      return;
    }

    const allowed = [
      '.csv',
      '.txt'
    ];

    const fileName =
      this.selectedFile.name
      .toLowerCase();

    const valid =
      allowed.some(ext =>
        fileName.endsWith(ext)
      );

    if (!valid) {

      alert(
        'Only CSV/TXT allowed'
      );

      return;
    }

    this.isLoading = true;

    this.fileService
      .uploadFile(this.selectedFile)
      .subscribe({

        next: () => {

          this.isLoading = false;

          alert(
            'File uploaded successfully'
          );

          this.loadFiles();

          this.selectedFile = null;
        },

        error: (err: any) => {

          this.isLoading = false;

          console.log(err);

          alert(
            err.error ||
            'Upload failed'
          );

          this.cdr.detectChanges();
        }
      });
  }
  archive(id: number) {

     console.log('ARCHIVE ID', id);

  this.fileService
    .archiveFile(id)
    .subscribe({

      next: () => {

        const file =
          this.files.find(
            f => f.id === id
          );

        if(file){
          file.STATUS =
            'Archived';
        }

        this.filteredFiles =
          [...this.files];

        this.cdr.detectChanges();

        alert('File Archived');
      }
    });
}
unarchive(id: number) {

  this.fileService
    .unarchiveFile(id)
    .subscribe({

      next: () => {

        const file =
          this.files.find(
            f => f.id === id
          );

        if(file){
          file.STATUS =
            'Success';
        }

        this.filteredFiles =
          [...this.files];

        this.cdr.detectChanges();

        alert('File Unarchived');
      }
    });
}

delete(id: number) {

  this.fileService
    .deleteFile(id)
    .subscribe({

      next: (res) => {

        console.log(
          'DELETE SUCCESS'
        );

        console.log(res);

        this.loadFiles();
      },

      error: (err: any) => {

        console.log(
          'DELETE ERROR'
        );

        console.log(err);

        alert(
          JSON.stringify(err)
        );
      }
    });
}
showErrors(errors: any) {

  console.log(
    'ERROR DATA:',
    errors
  );

  this.selectedErrors =
    errors ||
    'No error details available';
}
 goToUserRoles() {

    this.router.navigate(
      ['/user-role']
    );
  }

  // LOGOUT
  logout() {

    this.authService.logout();

    this.router.navigate(['/']);
  }
}