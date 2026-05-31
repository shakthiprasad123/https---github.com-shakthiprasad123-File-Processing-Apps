import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {}

  saveToken(token: string) {

    if(typeof window !== 'undefined') {

      localStorage.setItem(
        'token',
        token
      );
    }
  }

  getToken() {

    if(typeof window !== 'undefined') {

      return localStorage.getItem(
        'token'
      );
    }

    return null;
  }

  isLoggedIn(): boolean {

    if(typeof window !== 'undefined') {

      return !!localStorage.getItem(
        'token'
      );
    }

    return false;
  }
   getRole() {

  return localStorage.getItem(
    'role'
  );
}

  logout() {

  if(typeof window !== 'undefined') {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'role'
    );
  }
}
 
}