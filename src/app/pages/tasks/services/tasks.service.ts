import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/shareds/services/crud.service';
import { CreateTaskDTO } from '../dtos/create-task.dto';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends CrudService<any> {

  constructor(private httpClient: HttpClient) {
    super(httpClient)
  }


  public newTask(model: CreateTaskDTO): Observable<any> {
    this.endpoint = 'tasks/new'
    return this.create(model)
  }

  public updateTask(model: CreateTaskDTO): Observable<any> {
    this.endpoint = 'tasks/update'
    return this.update(model)
  }

  
  public deleteTask(id: any): Observable<any> {
    this.endpoint = 'tasks/delete'
    return this.delete(id)
  }

  public getTasksList(list_id: string): Observable<any> {
    this.endpoint = `tasks/all/${list_id}`
    return this.getAll();
  }

  public getTask(taskId: string): Observable<any> {
    this.endpoint = `tasks/one/${taskId}`
    return this.getAll();
  }
}
