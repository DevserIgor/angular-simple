import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginDTO } from '../models/login.dto';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { CreateUserDTO } from '../models/create-user.dto';
const headerOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<LoginDTO>;
  public currentUser: Observable<LoginDTO>;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    const token: any = sessionStorage.getItem('currentUser')
    this.currentUserSubject = new BehaviorSubject<LoginDTO>(JSON.parse(token));
    this.currentUser = this.currentUserSubject.asObservable();
  
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  signin = (value: LoginDTO) => {

    const url = `${environment.REST_API_URL}/auth/login`;
    const dataLogin = new LoginDTO(value.email, value.password)
    return this.http.post(url, dataLogin, headerOptions)
      .pipe(map((res: any) => {
        if(res && res.hasOwnProperty('data') && res.data){
          let user: any = {
            email: res['data']['data']['email'],
            token: res['data']['data']['token'],
            user_id: res['data']['data']['id'],
            name: res['data']['data']['name'],
          }
          
          if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            const token = user.token;
  
            sessionStorage.setItem('tokenUser', token.toString());
            if (sessionStorage.getItem('tokenUser') !== null && sessionStorage.getItem('tokenUser') !== undefined) {
              this.currentUserSubject.next(user);
            }
          }
  
          return res;
        }else{
          this.toastr.warning("Falha ao tentar fazer login")
          return false;
        }

      }))
  }

  register = (value: CreateUserDTO) => {

    const url = `${environment.REST_API_URL}/users/register`;
    const dataLogin = new CreateUserDTO(value.name, value.email, value.password)
    return this.http.post(url, dataLogin, headerOptions)
      .pipe(map((res: any) => {
    
        try {
         
          return res;
        } catch (error: any) {
          
          throw new Error(error.message)
        }
      }))
  }

}
