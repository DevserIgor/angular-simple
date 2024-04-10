import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatusCode } from 'src/app/shareds/enuns/status-code.enum';
import { MessagesToastrService } from 'src/app/shareds/services/messages-toastr.service';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy{
  taskForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private taskService: TasksService, 
    private messageToastr: MessagesToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute){}
    subscribes: Subscription[] = [];
  ngOnInit() {
   
    this.taskForm = this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      description: this.fb.control(null, [Validators.minLength(5)]),
      list: this.fb.control(null, [Validators.required])
    });

    const activeRouteSub =  this.activeRoute.paramMap.subscribe(params => {
      console.log("TEST PARAMS", params)
      const taskId =params.get('0');
      const listId = params.get('list_id');
      if(taskId){
        this.getTask(taskId)
      }
      if(listId){
        this.taskForm.controls['list'].setValue(listId);
    
      }
    });

    this.subscribes.push(activeRouteSub);

  }



  getTask(taskId: string) {
    const subscribService = this.taskService.getTask(taskId).subscribe({
      next: (res: any) => {
       if(res.data){
        const data: any = res.data;
        
        this.taskForm.setValue({
          id: data.id,
          name: data.name,
          description: data.description,
          list: this.taskForm.value.list,
        })
       }
       
      },
      error: (error: any) => {
        this.messageToastr.setErrorMessage(error.status);
        throw new Error(error.message);
        
      }
    })

    this.subscribes.push(subscribService);
  }

  submit(){
    if(this.taskForm.value.id){
      this.update()
    }else{
      this.save()
    }
  }

  save(){
    const subscribService =  this.taskService.newTask(this.taskForm.value).subscribe({
      next: () => {        
       this.messageToastr.setSuccessMessage(StatusCode.SUCESS)
      },
      error: (error: any) => {
        this.messageToastr.setErrorMessage(error.status);
        throw new Error(error.message);
      }
    })

    this.subscribes.push(subscribService);
  }

  update(){
    const subscribService =  this.taskService.updateTask(this.taskForm.value).subscribe({
      next: (res) => {        
        this.messageToastr.setSuccessMessage(StatusCode.SUCESS)
      },
      error: (error: any) => {
        this.messageToastr.setErrorMessage(error.status);
        throw new Error(error.message);
        
      }
    })

    this.subscribes.push(subscribService);
  }

  deleteList(){
    const subscribService = this.taskService.deleteTask(this.taskForm.value.id).subscribe({
      next: () => {
        this.messageToastr.setSuccessMessage(StatusCode.SUCESS)
        this.router.navigateByUrl('list')
        
      },
      error: (err: any) => {
        this.messageToastr.setErrorMessage(err.status)
        throw new Error(err.message);
        
      }
    })

    this.subscribes.push(subscribService);
  }
 
  
  ngOnDestroy(){
    this.subscribes.forEach(sub =>  sub.unsubscribe());
  }

}
