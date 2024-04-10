import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControlName, NgModel } from '@angular/forms';

@Component({
  selector: 'input-validate',
  templateUrl: './input-validate.component.html',
  styleUrls: ['./input-validate.component.scss']
})
export class InputValidateComponent implements OnInit {


  @Input() label: string | undefined;
  @Input() errorMessage: string | undefined;
  required = false;
  input: any = null;

  @ContentChild(NgModel, {static: true}) model: NgModel | undefined;
  @ContentChild(FormControlName, {static: true}) control: FormControlName | undefined;

  constructor() { }

  ngOnInit() {
    this.isRequired()

  }

  isRequired() {
    if(this.control){
      const control: any = this.control
      if(this.control.hasOwnProperty('_parent')){       
        const name:any = this.control.name
        const errors = control['_parent']['form']['controls'][name]['errors']
        if(errors){
          this.required = true
        }
      }
    }
  }

  ngAfterContentInit() {
    this.input = this.model || this.control;
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName')
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }

}
