import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { StatusCode } from 'src/app/shareds/enuns/status-code.enum';
import { StatusCodeMessage } from 'src/app/shareds/enuns/status-code-message';
import { MessagesToastrService } from 'src/app/shareds/services/messages-toastr.service';


@Component({
  selector: 'cta-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {


  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tosterMessage: MessagesToastrService,
    private authenticationService: AuthenticationService,
 
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [Validators.minLength(6), Validators.required])
    });

  }



  requestLogin = () => {
   
    this.authenticationService.signin(this.loginForm.value).subscribe(
      {
        next: (res: any) => {
          if(res){
            this.tosterMessage.setSuccessMessage(StatusCode.SUCESS)
            this.router.navigateByUrl('list')
          }
          
        },
        error: (err: any) => {
          this.tosterMessage.setErrorMessage(err.status);      
        }
      }
    )
  }

 

}
