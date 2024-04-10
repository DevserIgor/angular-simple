import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './components/show/show.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { CoreModule } from 'src/app/core/core.module';
import { TaskRoutingModule } from './tasks-routing.module';
import { CardTaskComponent } from './components/card-task/card-task.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



@NgModule({
  declarations: [
    FormComponent,
    ShowComponent,
    CardTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskRoutingModule,
    SharedsModule,
    CoreModule,
    NgxSkeletonLoaderModule.forRoot({ 
      animation: 'progress-dark', 
      loadingText: 'This item is actually loading...',
      theme: {
        // Enabliong theme combination
        extendsFromRoot: true,
        // ... list of CSS theme attributes
        height: '100vh',
        width: '100%',
      }
    },
   ),
  ]
})
export class TasksModule { }
