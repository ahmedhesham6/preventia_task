import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  getSuperAdminsUrl: string = 'api/user/search?filters=%7B%0A%20%20%22role%22%3A%20%22Super%20Admin%22%0A%7D';

  getAdminsUrl: string = 'api/user/search?filters=%7B%0A%20%20%22role%22%3A%20%22Admin%22%0A%7D';

  getBusinessUsersUrl: string = 'api/user/search?filters=%7B%0A%20%20%22role%22%3A%20%22Business%20User%22%0A%7D';

  getUsersUrl: string = 'api/user/search?filters=%7B%0A%20%20%22role%22%3A%20%22User%22%0A%7D';

  getAllUsersUrl: string = 'api/user/search';

  inviteAdminUrl: string = 'api/admin/invite';
  searchUsersUrl: string = "api/user";

  constructor(private http: HttpClient) { }

  //Get admins
  getSuperAdmins(): Observable<any> {
    return this.http.get<any>(this.getSuperAdminsUrl);
  }

  //Get admins
  getAdmins(): Observable<any> {
    return this.http.get<any>(this.getAdminsUrl);
  }

  // Get Business Users
  getBusinessUsers(): Observable<any> {
    return this.http.get<any>(this.getBusinessUsersUrl);
  }

  //Get users
  getUsers(): Observable<any> {
    return this.http.get<any>(this.getUsersUrl);
  }

  //Get all users
  getAllUsers(params): Observable<any> {
    return this.http.get<any>(this.getAllUsersUrl, { params });
  }

  //Invite Admin
  inviteAdmin(admin): Observable<any> {
    return this.http.post<any>(this.inviteAdminUrl, admin);
  }

  // Search Users
  searchUsers(params): Observable<any> {
    return this.http.get<any>(`${this.searchUsersUrl}/search`, { params });

  }
}
