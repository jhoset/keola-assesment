import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddEditTaskComponent} from './pages/add-edit-task/add-edit-task.component';
import {ListComponent} from './pages/list/list.component';
import {RowActionsComponent} from './components/row-actions/row-actions.component';
import {LoadingComponent} from './components/loading/loading.component';
import {SearchComponent} from './components/search/search.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {CommonTasksService} from "./services/common-tasks.service";
import {TasksRoutingModule} from "./tasks-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";


@NgModule({
  declarations: [
    AddEditTaskComponent,
    ListComponent,
    RowActionsComponent,
    LoadingComponent,
    SearchComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule
  ],
  providers: [CommonTasksService]
})
export class TasksModule {
}
