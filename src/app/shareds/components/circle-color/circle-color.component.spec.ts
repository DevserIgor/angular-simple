import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleColorComponent } from './circle-color.component';

describe('CircleColorComponent', () => {
  let component: CircleColorComponent;
  let fixture: ComponentFixture<CircleColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleColorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
