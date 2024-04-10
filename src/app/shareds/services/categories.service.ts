import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultDTO } from '../dtos/result.dto';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends CrudService<any>{

  constructor(
    httpClient: HttpClient,
    private crudService : CrudService;
  ) {
    super(httpClient)
    this.endpoint = 'tasks/categories/all'
   }

  getCategoroies(): Observable<any> {
    this.endpoint = 'tasks/categories/all'
    return this.getAll()
  }
}
