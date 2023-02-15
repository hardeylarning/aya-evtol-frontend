import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL_ = 'http://localhost:5000/api/v1/users'
  private BASE_URL = 'https://evtol-api-gzz7.onrender.com/api/v1/users'


  constructor(private http: HttpClient) { }

  getUser(id: string) {
    return this.http.get<any>(this.BASE_URL+'/'+id)
  }

  // getUserByEmail(email: string) {
  //   return this.http.get<any>(this.BASE_URL+'/get-by-email/'+email)
  // }

  // userResetPassword(email: string, password: string) {
  //   return this.http.put<any>(`${this.BASE_URL}/reset-password/${email}`, {password})
  // }

  getUsers() {
    return this.http.get<any>(this.BASE_URL)
  }

  addUser(user: User) {
    return this.http.post<any>(this.BASE_URL +'/register', user)
  }

  updateUser(id:string, user: User) {
    return this.http.put<any>(this.BASE_URL+'/'+id, user)
  }

  deleteUser(id:string) {
    return this.http.delete<void>(this.BASE_URL+'/'+id)
  }

  login(email: string, password: string) {
    const requestHeader = {
      headers: new HttpHeaders(
       { "No-Auth": "True"}
      )
    }
    return this.http.post<any>(`${this.BASE_URL}/login`, { email, password }, requestHeader)
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('role')
    
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null
  }

  getToken() {
    return localStorage.getItem('token') || ''
  }
  getRole() {
    return localStorage.getItem('role') || ''
  }

  userLoggedIn() {
    return localStorage.getItem('userId') || undefined
  }
}
