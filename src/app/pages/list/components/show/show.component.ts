import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatusCode } from 'src/app/shareds/enuns/status-code.enum';
import { MessagesToastrService } from 'src/app/shareds/services/messages-toastr.service';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {

  constructor(private listService: ListService, private messageToastr: MessagesToastrService){}
  timetoutFinish = false;
  subscription: Subscription | undefined;
  ngOnInit() {
    this.getLists()
    const timeout = 2000;
    setTimeout(() => {
      this.timetoutFinish = true;
    }, timeout);
  }

  lists: any[] = [];
  getLists(){

    const subscription = this.listService.getLists().subscribe({
      next: (res) => {
        this.messageToastr.setSuccessMessage(StatusCode.SUCESS)
        this.lists = res.data;

      },
      error: (err) =>{
        this.messageToastr.setErrorMessage(err.status)
        throw new Error(err.message);
      
      }
    })


  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
    console.log("ng on destroy ", this.subscription);
  }
 
}
