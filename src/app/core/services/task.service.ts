import {Injectable} from '@angular/core';

type Priority = 'low' | 'medium' | 'high';

export interface TaskDto {
  id: string,
  title: string,
  description: string,
  expirationDate: string, // TBD (Could be date)
  priority: Priority,
  tags: string[],
}

export interface Response {
  ok: boolean,
  data?: any,
  error?: any
}


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskList: TaskDto[] = [];

  constructor() {
    this.loadTasksFromLS()
  }

  private updateTasksInLS() {
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

  private loadTasksFromLS() {
    const tasks = localStorage.getItem('tasks');
    this.taskList = tasks ? JSON.parse(tasks) : [];
  }

  getTasks(): Response {
    try {
      return {ok: true, data: this.taskList};
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return {ok: false, error};
    }
  }

  addTask(task: TaskDto): Response {
    try {
      this.taskList.push(task);
      this.updateTasksInLS();
      return {ok: true};
    } catch (error) {
      console.error('Error adding task:', error);
      return {ok: false, error};
    }
  }

  deleteTask(id: string): Response {
    try {
      const index = this.taskList.findIndex(e => e.id === id);

      if (index === -1) {
        return {ok: false, error: 'Task not found'};
      }

      this.taskList.splice(index, 1);
      this.updateTasksInLS();
      return {ok: true};
    } catch (error) {
      console.error('Error deleting task:', error);
      return {ok: false, error};
    }
  }

  updateTask(id: string, updatedTask: TaskDto): Response {
    try {
      const index = this.taskList.findIndex(e => e.id === id);

      if (index === -1) {
        return {ok: false, error: 'Task not found'};
      }

      this.taskList[index] = updatedTask;
      this.updateTasksInLS();
      return {ok: true};
    } catch (error) {
      console.error('Error updating task:', error);
      return {ok: false, error};
    }
  }
}
