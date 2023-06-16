import { Component, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from '../icon/icon.component';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { DialogService } from '../dialog-service.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  imports: [MatIconModule, IconComponent, ModalComponent, CommonModule],
})
export class NavbarComponent {
  search = 'search';
  searchText = 'tooltip';

  settings = 'settings';

  add = 'add';
  addTooltipText = 'Add event';

  delete = 'delete';

  publish = 'publish';

  test = 'check_box';
  placement_value = 'text';
  constructor(
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}
  public get isOpen(): boolean {
    return this.dialogService.isOpen;
  }
  openDialog() {
    this.dialogService.openDialog();
    this.cdr.detectChanges();
  }
  closeDialog() {
    this.dialogService.closeDialog();
    this.cdr.detectChanges();
  }
}
