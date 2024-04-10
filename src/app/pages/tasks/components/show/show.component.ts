import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListService } from 'src/app/pages/list/services/list.service';
import { StatusCode } from 'src/app/shareds/enuns/status-code.enum';
import { MessagesToastrService } from 'src/app/shareds/services/messages-toastr.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy{
  subscribes: Subscription[] = [];
  constructor(
    private taskService: TasksService, 
    private messageToastr: MessagesToastrService,
    private listService: ListService,
    private activeRoute: ActivatedRoute){}
  timetoutFinish = false;
  listId: string | null = null;
  subscribeActivedRoute: Subscription | undefined;
  ngOnInit() {
   
    const activeRouteSubscribe =  this.activeRoute.paramMap.subscribe(params => {
     
      const list_id =params.get('list_id');
      if(list_id){
        this.listId = list_id;
        this.getTasks(list_id)
        this.getList(list_id)
      }
    });

    this.subscribes.push(activeRouteSubscribe);
    
    const timeout = 2000;
    setTimeout(() => {
      this.timetoutFinish = true;
    }, timeout);

  }

  tasks: any[] = [];
  getTasks(list_id: string){

    const subscribe = this.taskService.getTasksList(list_id).subscribe({
      next: (res) => {
        this.messageToastr.setSuccessMessage(StatusCode.SUCESS)
        this.tasks = res.data;

      },
      error: (err) =>{
       this.messageToastr.setErrorMessage(err.status);
       throw new Error(err.message);
       
      }
    })

    this.subscribes.push(subscribe);
  }

  listName: string  = '';
  getList(listId: string) {
   const subscribe =  this.listService.getList(listId).subscribe({
      next: (res: any) => {
       if(res.data){
        this.listName = res.data.name;        
       }
       
      },
      error: (error: any) => {
        this.messageToastr.setErrorMessage(error.status);
        throw new Error(error.message);
        
      }
    })

    this.subscribes.push(subscribe);
  }

  ngOnDestroy(){
    this.subscribes.forEach((sub) => {
      console.log("destroy sub ", sub)
      sub.unsubscribe();      
    })
  }
}


