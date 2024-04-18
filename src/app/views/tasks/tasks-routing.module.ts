import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListComponent} from "./pages/list/list.component";
import {AddEditTaskComponent} from "./pages/add-edit-task/add-edit-task.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: ListComponent,
      },
      {
        path: 'add', component: AddEditTaskComponent,
      },
      {
        path: 'edit', component: AddEditTaskComponent,
      },
      {
        path: '*', redirectTo: ''
      }
    ]

  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TasksRoutingModule {
}
