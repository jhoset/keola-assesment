import { Component } from '@angular/core';
import {DialogService} from "./shared/services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public _dialogService: DialogService) {
  }
}
