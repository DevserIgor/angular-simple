import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/shareds/services/crud.service';
import { CreateListDTO } from '../dtos/create-list.dto';

@Injectable({
  providedIn: 'root'
})
export class ListService extends CrudService<any> {

  constructor(private httpClient: HttpClient) {
    super(httpClient)
    this.endpoint = 'tasks/lists/all'
  }


  public new(model: CreateListDTO): Observable<any> {
    this.endpoint = 'tasks/lists/new'
    return this.create(model)
  }

  public updateList(model: CreateListDTO): Observable<any> {
    this.endpoint = 'tasks/lists/update'
    return this.update(model)
  }

  
  public deleteList(id: any): Observable<any> {
    this.endpoint = 'tasks/lists/delete'
    return this.delete(id)
  }

  public getLists(): Observable<any> {
    const dataUser:any  = sessionStorage.getItem('currentUser');
    const user = JSON.parse(dataUser);
    const currentUserId = user.user_id;
    this.endpoint = `tasks/lists/all/${currentUserId}`
    return this.getAll();
  }

  public getList(listId: string): Observable<any> {
    this.endpoint = `tasks/lists/one/${listId}`
    return this.getAll();
  }
}
