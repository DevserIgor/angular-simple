import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
  protected urlApi = environment.REST_API_URL;
  protected endpoint: string | undefined;
  tokenRest: string | null;
  currentUser: any = null
  headerOptions: any = null
  constructor(protected http: HttpClient, ) {
    this.tokenRest = sessionStorage.getItem('tokenUser');
    this.headerOptions = { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`bearer ${this.tokenRest}`
    })};
  }
 

  public getAll(): Observable<HttpEvent<T[]>> {
    const url = `${this.urlApi}/${this.endpoint}`;
    return this.http.get<T[]>(url, this.headerOptions);
  }

  public getOne(id: any): Observable<HttpEvent<T>> {
    const url = `${this.urlApi}/${this.endpoint}`;
    return this.http.get<T>(`${url}/${id}`, this.headerOptions);
  }

  public create(data: T): Observable<HttpEvent<T>> {
    const url = `${this.urlApi}/${this.endpoint}`;
    return this.http.post<T>(url, data,  this.headerOptions);
  }

  public update(data: T): Observable<HttpEvent<T>> {
    const url = `${this.urlApi}/${this.endpoint}`;
    return this.http.put<T>(url, data,  this.headerOptions);
  }

  public delete(id: number): Observable<HttpEvent<T>> {
    const url = `${this.urlApi}/${this.endpoint}/${id}`;
    return this.http.delete<T>(url, this.headerOptions);
  }
}