import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TaskDto} from "../../../core/services/task.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";

@Injectable()
export class CommonTasksService {
  public taskFormGroup!: FormGroup;
  private taskDto$ = new BehaviorSubject<TaskDto | null>(null)

  constructor() {
    this.taskFormGroup = new FormGroup({
      id: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      expirationDate: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'), [Validators.required, this.expirationDateValidator]),
      priority: new FormControl('', [Validators.required]),
      tags: new FormControl([], [Validators.required]),
    });
  }

  public setTaskDto(taskDto: TaskDto | null) {
    this.taskDto$.next(taskDto);
  }

  public getTaskDto() {
    return this.taskDto$.value;
  }

  public resetForm() {
    this.idControl.reset();
    this.titleControl.reset();
    this.descriptionControl.reset();
    this.expirationDateControl.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'))
    this.priorityControl.reset();
    this.tagsControl.reset();
  }

  public syncFormGroup() {
    const taskDto = this.getTaskDto();
    if (!taskDto) return;
    this.idControl.setValue(taskDto.id);
    this.titleControl.setValue(taskDto.title);
    this.descriptionControl.setValue(taskDto.description);
    this.expirationDateControl.setValue(taskDto.expirationDate);
    this.priorityControl.setValue(taskDto.priority);
    this.tagsControl.setValue(taskDto.tags);
  }

  public initTaskDto() {
    const taskDto: TaskDto = {id: '', title: '', description: '', expirationDate: '', priority: 'low', tags: []}
    this.setTaskDto(taskDto);
  }


  public syncTaskDto() {
    let taskDto = this.getTaskDto();
    if (!taskDto) return
    taskDto.id = this.idControl.value;
    taskDto.title = this.titleControl.value;
    taskDto.description = this.descriptionControl.value;
    taskDto.expirationDate = this.expirationDateControl.value;
    taskDto.priority = this.priorityControl.value;
    taskDto.tags = this.tagsControl.value;
  }


  /* CUSTOM VALIDATORS */
  private expirationDateValidator(control: AbstractControl) {
    if (!control.value || isNaN(new Date(control.value).getTime())) {
      return null;
    }
    const [year, month, day] = control.value.split('-')
    const expirationDate = new Date(+year, +month - 1, +day);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return expirationDate.getTime() >= currentDate.getTime() ? null : {invalidDate: true};
  }


  /* GETTERS */
  public get idControl(): FormControl {
    return this.taskFormGroup.get('id') as FormControl;
  }

  public get titleControl(): FormControl {
    return this.taskFormGroup.get('title') as FormControl;
  }

  public get descriptionControl(): FormControl {
    return this.taskFormGroup.get('description') as FormControl;
  }

  public get expirationDateControl(): FormControl {
    return this.taskFormGroup.get('expirationDate') as FormControl;
  }

  public get priorityControl(): FormControl {
    return this.taskFormGroup.get('priority') as FormControl;
  }

  public get tagsControl(): FormControl {
    return this.taskFormGroup.get('tags') as FormControl;
  }

}
