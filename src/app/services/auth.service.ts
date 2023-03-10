import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn$.asObservable()

  constructor(private userService: UserService) { 
    const token = localStorage.getItem('token')
    this._isLoggedIn$.next(!!token)
  }

  login(username: string, password: string) {
    return this.userService.login(username, password).pipe(
      tap((res:any) => {
        this._isLoggedIn$.next(true)
        localStorage.setItem('userId', res.data.userId)
        localStorage.setItem('userName', res.data.fullname)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', res.data.role)
      })
    )
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('role')
    
  }
}
