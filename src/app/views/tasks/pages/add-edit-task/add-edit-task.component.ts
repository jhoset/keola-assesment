import {Component, OnInit} from '@angular/core';
import {CommonTasksService} from "../../services/common-tasks.service";
import {TaskService} from "../../../../core/services/task.service";
import {Router} from "@angular/router";
import {ToastService} from "../../../../shared/services";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
})
export class AddEditTaskComponent implements OnInit {
  public loading: boolean = false;
  public submitted: boolean = false;

  public tagList = [
    'UI/UX',
    'Frontend',
    'Backend',
    'DevOps',
    'PM',
  ];

  public dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    enableCheckAll: false,
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  public minExpirationDate = new Date();

  constructor(public _commonTaskService: CommonTasksService,
              private _taskService: TaskService,
              private _router: Router,
              private _toastService: ToastService) {
    this.minExpirationDate.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    if (this._commonTaskService.getTaskDto()) {
      this._commonTaskService.syncFormGroup()
    } else {
      this._commonTaskService.resetForm();
      this._commonTaskService.idControl.setValue(uuidv4())
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this._commonTaskService.taskFormGroup.invalid) return;
    this.loading = true;
    if (!this._commonTaskService.getTaskDto()) {
      this._commonTaskService.initTaskDto();
      this._commonTaskService.syncTaskDto();
      this.addTask();
    } else {
      this._commonTaskService.syncTaskDto();
      this.updateTask();
    }
  }

  onReturnToTaskListPage() {
    this._router.navigate(['/tasks']);
    this._commonTaskService.setTaskDto(null);
  }

  addTask() {
    const resp = this._taskService.addTask(this._commonTaskService.getTaskDto()!);
    if (resp.ok) {
      this._router.navigate(['/tasks']).then(rs => {
        this._toastService.display({
          title: 'Success',
          message: 'Task added successfully!',
          type: 'success'
        });
        this._commonTaskService.setTaskDto(null);
      })
    }
    this.loading = false;
  }

  updateTask() {
    const resp = this._taskService.updateTask(this._commonTaskService.getTaskDto()?.id!, this._commonTaskService.getTaskDto()!);
    if (resp.ok) {
      this._router.navigate(['/tasks']).then(rs => {
        this._toastService.display({
          title: 'Success',
          message: 'Task updated successfully!',
          type: 'success'
        });
        this._commonTaskService.setTaskDto(null);
      })
    }
    this.loading = false;
  }
}
