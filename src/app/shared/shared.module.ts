import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomButtonComponent} from './components/custom-button/custom-button.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ToastComponent} from './components/toast/toast.component';
import { ClickDetectorDirective } from './directives/click-detector.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';


@NgModule({
  declarations: [
    CustomButtonComponent,
    DialogComponent,
    NavbarComponent,
    ToastComponent,
    ClickDetectorDirective,
    ClickOutsideDirective
  ],
  exports: [
    CustomButtonComponent,
    DialogComponent,
    NavbarComponent,
    ToastComponent,
    ClickDetectorDirective,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
