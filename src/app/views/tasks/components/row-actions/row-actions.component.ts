import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-row-actions',
  templateUrl: './row-actions.component.html'
})
export class RowActionsComponent {
  @Output() onEdit: EventEmitter<void> = new EventEmitter<void>()
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>()

  public isMenuOpen: boolean = false

  public onClose() {
    this.isMenuOpen = false;
  }

  public onToggleMenu(event: Event) {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public onClickEdit(event: Event) {
    this.onEdit.emit()
  }

  public onClickDelete(event: Event) {
    this.onDelete.emit()
  }
}
