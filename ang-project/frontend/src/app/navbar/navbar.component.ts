import { Component, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from '../icon/icon.component';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { DialogService } from '../dialog-service.service';
import { Router } from '@angular/router';
import { InhibitorService } from '../inhibitor.service';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  imports: [
    MatIconModule,
    IconComponent,
    ModalComponent,
    CommonModule,
    SettingsComponent,
  ],
})
export class NavbarComponent {
  search = 'search';
  searchText = 'tooltip';

  settings = 'settings';
  settingsText = 'Settings';

  add = 'add';
  addTooltipText = 'Add event';

  delete = 'delete';

  publish = 'publish';

  test = 'check_box';
  placement_value = 'text';
  constructor(
    private dialogService: DialogService,
    private sett: InhibitorService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}
  public get isOpen(): boolean {
    return this.dialogService.isOpen;
  }
  public get isSettOpen(): boolean {
    return this.sett.isOpen;
  }
  openSett() {
    this.sett.openDialog();
    console.log('clicked');
    console.log(this.isSettOpen);
    this.cdr.detectChanges();
  }
  closeSett() {
    this.sett.closeDialog();
    this.cdr.detectChanges();
  }
  openDialog() {
    this.dialogService.openDialog();
    console.log(this.isOpen);
    this.cdr.detectChanges();
  }
  closeDialog() {
    this.dialogService.closeDialog();
    this.cdr.detectChanges();
  }
}
