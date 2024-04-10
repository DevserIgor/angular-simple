import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ShowComponent } from './components/show/show.component';

const routes: Routes = [
  {
    path: '',
    component: ShowComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'form/:id_task',
    component: FormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
