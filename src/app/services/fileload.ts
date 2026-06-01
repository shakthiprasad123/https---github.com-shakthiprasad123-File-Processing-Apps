import { Injectable }
from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FileloadService {

  baseUrl =
    'http://localhost:5224/api';

  constructor(
    private http: HttpClient
  ) {}

  getHeaders() {

    const token =
      localStorage.getItem(
        'token'
      );

    return {

      headers:
      new HttpHeaders({

        Authorization:
        `Bearer ${token}`
      })
    };
  }

  getFiles() {

    return this.http.get(
      `${this.baseUrl}/file-loads`,
      this.getHeaders()
    );
  }

  uploadFile(file: File) {

    const formData =
      new FormData();

    formData.append(
      'file',
      file
    );

    return this.http.post(
      `${this.baseUrl}/upload`,
      formData,
      this.getHeaders()
    );
  }
  archiveFile(id: number) {

  return this.http.post(
    `${this.baseUrl}/file-loads/${id}/archive`,
    {},
    this.getHeaders()
  );
}

unarchiveFile(id: number) {

  return this.http.post(
    `${this.baseUrl}/file-loads/${id}/unarchive`,
    {},
    this.getHeaders()
  );
}

deleteFile(id: number) {

  return this.http.delete(
    `${this.baseUrl}/file-loads/${id}`,
    this.getHeaders()
  );
}

getUsers() {

  return this.http.get(
    'http://localhost:5224/user',
    this.getHeaders()
  );
}

getRoles() {

  return this.http.get(
    'http://localhost:5224/role',
    this.getHeaders()
  );
}

getUserRoles() {

  return this.http.get(
    'http://localhost:5224/userrole',
    this.getHeaders()
  );
}
createUser(user: any) {

  return this.http.post(
    'http://localhost:5224/user',
    user,
    this.getHeaders()
  );
}

updateUserRole(
  userId: number,
  roleId: number
) {

  return this.http.put(
    'http://localhost:5224/userrole',
    {
      USR_ID: userId,
      ROLE_ID: roleId
    },
    this.getHeaders()
  );
}
deleteUser(id: number) {

  return this.http.delete(
    `http://localhost:5224/user/${id}`,
    this.getHeaders()
  );
}
}