import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatusCode } from 'src/app/shareds/enuns/status-code.enum';
import { CategoriesService } from 'src/app/shareds/services/categories.service';
import { MessagesToastrService } from 'src/app/shareds/services/messages-toastr.service';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy{
  listForm!: FormGroup;
  subscriptions: Subscription[] = [];
  constructor(
    private fb: FormBuilder, 
    private categoryService: CategoriesService, 
    private listService: ListService, 
    private messageToastr: MessagesToastrService,
    private router: Router,
    private activeRoute: ActivatedRoute){}

  ngOnInit() {
    const userSession:any = sessionStorage.getItem('currentUser');
    const user = JSON.parse(userSession);

    this.listForm = this.fb.group({
      id: this.fb.control(null),
      name: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      description: this.fb.control(null, [Validators.minLength(5)]),
      category: this.fb.control(null, [Validators.minLength(6), Validators.required]),
      user:  this.fb.control(user.user_id)
    });

    const activeRouteSubscription =  this.activeRoute.paramMap.subscribe(params => {
      const listId = params.get('list_id');
      if(listId){
        this.getList(listId)
      }
    });
    this.subscriptions.push(activeRouteSubscription);
    this.getCategories()

  }

  categories: any[] = []
  getCategories(){
    const subscriptionService = this.categoryService.getAll().subscribe({
      next: (res: any) => {
        this.messageToastr.setSuccessMessage(StatusCode.SUCESS)
        const values = res.data;
        this.categories = values;
      },
      error: (err) => {
        this.messageToastr.setErrorMessage(err.status);
        throw new Error(err.message);
        
      }
    })

    this.subscriptions.push(subscriptionService);
  }


  getList(listId: string) {
    const subscriptionService = this.listService.getList(listId).subscribe({
      next: (res: any) => {
       if(res.data){
        const data: any = res.data;
        
        this.listForm.setValue({
          id: data.id,
          name: data.name,
          description: data.description,
          category: data.categoryId,
          user: data.userId
        })
       }
       
      },
      error: (error: any) => {
        this.messageToastr.setErrorMessage(error.status);
        throw new Error(error.message);
        
      }
    })

    this.subscriptions.push(subscriptionService);
    
  }

  submit(){
    if(this.listForm.value.id){
      this.update()
    }else{
      this.save()
    }
  }

  save(){
    const subscriptionService = this.listService.new(this.listForm.value).subscribe({
      next: () => {        
       this.messageToastr.setSuccessMessage(StatusCode.SUCESS)
      },
      error: (error: any) => {
        this.messageToastr.setErrorMessage(error.status);
        throw new Error(error.message);
      }
    })

    this.subscriptions.push(subscriptionService);
  }

  update(){
    const subscriptionService =  this.listService.updateList(this.listForm.value).subscribe({
      next: (res) => {        
        this.messageToastr.setErrorMessage(StatusCode.SUCESS)
      },
      error: (error: any) => {
        this.messageToastr.setErrorMessage(error.status);
        throw new Error(error.message);
        
      }
    })

    this.subscriptions.push(subscriptionService);
  }

  deleteList(){
    const subscriptionService =  this.listService.deleteList(this.listForm.value.id).subscribe({
      next: () => {
        this.messageToastr.setSuccessMessage(StatusCode.SUCESS)
        this.router.navigateByUrl('list')
        
      },
      error: (err: any) => {
        this.messageToastr.setErrorMessage(err.status)
        throw new Error(err.message);
        
      }
    })

    this.subscriptions.push(subscriptionService);
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
