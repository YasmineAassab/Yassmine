import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../model/user.model';

const API_URL = 'http://localhost:8036/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user:User;
  get user(): User {
    if (this._user==null){
      this._user=new User();
    }
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  constructor(private http: HttpClient) { }
  getUsersComptable(){
    this.http.get<any>(API_URL + 'userRole/').subscribe(
        data=>{
          console.log(data);
        },error => {
          console.log(error);
        }
    );
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
