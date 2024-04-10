import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentBodyComponent } from './components/content-body/content-body.component';
import { RouterModule } from '@angular/router';
import { SharedsModule } from '../shareds/shareds.module';

@NgModule({
  declarations: [
    ContentBodyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedsModule
  ],
  exports: [ContentBodyComponent]
})
export class CoreModule { }
