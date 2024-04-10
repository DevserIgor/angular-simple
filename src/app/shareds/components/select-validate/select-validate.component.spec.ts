import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectValidateComponent } from './select-validate.component';

describe('SelectValidateComponent', () => {
  let component: SelectValidateComponent;
  let fixture: ComponentFixture<SelectValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectValidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
