import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './components/show/show.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { ListRoutingModule } from './list.routing.module';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ItemListComponent } from './components/item-list/item-list.component';

@NgModule({
  declarations: [
    ShowComponent,
    FormComponent,
    ItemListComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedsModule,
    ListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
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
export class ListModule { }
