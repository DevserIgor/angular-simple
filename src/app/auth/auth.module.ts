import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth.module.routing';
import { AuthenticationService } from './services/authentication.service';
import { RegisterComponent } from './views/register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
  ],
  providers: [AuthenticationService]
})
export class AuthModule { }
