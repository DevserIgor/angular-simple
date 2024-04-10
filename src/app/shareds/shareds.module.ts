import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleColorComponent } from './components/circle-color/circle-color.component';
import { InputValidateComponent } from './components/input-validate/input-validate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectValidateComponent } from './components/select-validate/select-validate.component';
import { CategoriesService } from './services/categories.service';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    CircleColorComponent,
    InputValidateComponent,
    SelectValidateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    CircleColorComponent,
    InputValidateComponent,
    SelectValidateComponent,
  ],
  providers: [CategoriesService]
})
export class SharedsModule { }
