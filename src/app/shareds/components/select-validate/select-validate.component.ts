import { AfterContentInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { FormControlName, NgModel } from '@angular/forms';

@Component({
  selector: 'select-validate',
  templateUrl: './select-validate.component.html',
  styleUrls: ['./select-validate.component.scss']
})
export class SelectValidateComponent implements OnInit, AfterContentInit {

  @Input() label: string | undefined;
  @Input() errorMessage: string | undefined;
  @Input() required = true;
  input: any;

  @ContentChild(NgModel, {static: true}) model: NgModel | undefined;
  @ContentChild(FormControlName,  {static: true}) control: FormControlName | undefined;
  constructor() { }

  ngOnInit() {
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