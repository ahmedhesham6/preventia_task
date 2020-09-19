import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { CurrentuserService } from './currentuser.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string;
  tokenKey: string = 'x-access-token';
  currentUserKey: string = 'x-current-user';
  loginUrl: string = 'https://reqres.in/api/login';

  constructor(
    private router: Router,
    private http: HttpClient,
    private currentUserService: CurrentuserService
  ) {}

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
  setCurrentUser(credintials: any) {
    if (credintials.userProfile) {
      credintials.userProfile.auth = credintials.auth;
      localStorage.setItem(
        this.currentUserKey,
        JSON.stringify(credintials.userProfile)
      );
    } else {
      localStorage.setItem(
        this.currentUserKey,
        JSON.stringify(credintials.auth)
      );
    }
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.currentUserKey));
  }
  getToken() {
    let token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.token = token;
      return token;
    } else {
      this.logout();
      return null;
    }
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/auth/login']);
  }

  login(user) {
    this.setToken(user.token);
    if (user.auth.email === 'george.bluth@reqres.in') {
      user.auth.isAdmin = true;
    }
    this.setCurrentUser(user);
    this.currentUserService.setUser(this.getCurrentUser());
  }

  signIn(data): Promise<any> {
    return this.http.post<any>(this.loginUrl, data).toPromise();
  }

  loggedIn() {
    return !!localStorage.getItem(this.tokenKey);
  }
}
