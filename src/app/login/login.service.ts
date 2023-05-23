import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = true;

  isAdmin: boolean = true;

  constructor() { }

  login(email: string, password: string) {
    if (email === "admin@gmail.com" && password === "admin") {
      this.isLoggedIn = true;
      this.isAdmin = true;
    }
    if (email === "user@gmail.com" && password === "user") {
      this.isLoggedIn = true;
      this.isAdmin = false;
    }
    return this.isLoggedIn;
  }

}
