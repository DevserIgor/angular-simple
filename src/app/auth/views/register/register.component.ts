import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StatusCode } from 'src/app/shareds/enuns/status-code.enum';
import { MessagesToastrService } from 'src/app/shareds/services/messages-toastr.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;
    constructor(
      private router: Router,
      private fb: FormBuilder,
      private authenticationService: AuthenticationService,
      private messageToastr: MessagesToastrService,
      private toastr: ToastrService
  
    ) { }


    
  ngOnInit() {

    this.registerForm = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.minLength(6), Validators.required])
    });

  }

  save = () => {
   
    this.authenticationService.register(this.registerForm.value).subscribe(
      {
        next: (res: any) => {
          if(res){
            this.messageToastr.setSuccessMessage(StatusCode.SUCESS_CREATE)
            this.router.navigateByUrl('login')
          }
          
        },
        error: (err: any) => {
          this.messageToastr.setErrorMessage(err.status);
          throw new Error(err.message);
          
        }
      }
    )
  }
}
