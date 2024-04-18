import {Component} from '@angular/core';
import {TaskDto, TaskService} from "../../../../core/services/task.service";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonTasksService} from "../../services/common-tasks.service";
import {DialogService, ToastService} from "../../../../shared/services";
import {take} from "rxjs";

interface TableColumn {
  name: string;
  field?: string
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent {

  public data: TaskDto[] = [];
  public filteredData: TaskDto[] = [];
  public dataToDisplay: TaskDto[] = [];
  public loading: boolean = false;

  public limitFormControl: FormControl = new FormControl<number>(5);


  constructor(private _tasksService: TaskService,
              private _router: Router,
              private _commonTaskService: CommonTasksService,
              private _toastService: ToastService,
              private _dialogService: DialogService) {
  }

  ngOnInit() {
    this.loading = true;
    const result = this._tasksService.getTasks()
    if (result.ok) {
      this.data = result.data;
      this.filteredData = this.data;
      this.filterByPaginationState(1)
    }
    this.loading = false;
  }

  public goToEditTask(task: TaskDto) {
    this._commonTaskService.setTaskDto(task);
    this._router.navigate(['/tasks/edit'])
  }

  public goToAddTask() {
    this._commonTaskService.setTaskDto(null);
    this._router.navigate(['/tasks/add'])
  }

  public onDeleteTask(task: TaskDto) {
    this._dialogService.open({
      title: 'Eliminar Tarea',
      body: `¿Estas seguro de eliminar la tarea: ${task.title}?`
    }).pipe(take(1)).subscribe(response => {
      if (response === 'ok') {
        this.loading = true;
        const resp = this._tasksService.deleteTask(task.id);
        if ( resp.ok ) {
          this._toastService.display({
            title: 'Success',
            message: 'Task deleted successfully',
            type: 'success'
          })
          this.removeDeletedItemFromData(task.id);
        }
        this.loading = false;
      }
    })
  }

  public removeDeletedItemFromData(id: string) {
    this.data = this.data.filter(task => task.id !== id);
    this.filteredData = this.data;
    this.filterByPaginationState(1)
  }


  public onSearch(text: string) {
    const searchText = text.trim().toLowerCase();
    if (searchText.length) {
      this.filteredData = this.data.filter(task => (
        (task.title.toLowerCase().includes(searchText) || task.description.toLowerCase().includes(searchText)
        || task.priority.toLowerCase().includes(searchText))
      ))
    } else {
      this.filteredData = this.data;
    }
    this.filterByPaginationState(1)
  }


  public filterByPaginationState(currentPage: number) {
    this.loading = true;
    const start: number = (currentPage - 1) * this.limitFormControl.value;
    const end: number = start + +(this.limitFormControl.value);
    this.dataToDisplay = this.filteredData.slice(start, end);
    this.loading = false;
  }

  public onNextPage(page: number) {
    this.filterByPaginationState(page);
  }

  public onPrevPage(page: number) {
    this.filterByPaginationState(page);
  }

  public onChangeLimit(limit: number) {
    this.filterByPaginationState(1);
  }

  public tableColumns: TableColumn[] = [
    {name: 'Titulo', field: 'title'},
    {name: 'Descripción', field: 'description'},
    {name: 'Fecha Limite', field: 'expirationDate'},
    {name: 'Prioridad', field: 'priority'},
    {name: 'Etiquetas', field: 'etiquetas'},
    {name: '', field: ''},
  ];

}
