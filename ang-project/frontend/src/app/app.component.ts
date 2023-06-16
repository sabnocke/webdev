import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { CalendarComponent } from './calendar/calendar.component';
import { ModalComponent } from './modal/modal.component';
import { IconComponent } from './icon/icon.component';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from './dialog-service.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  imports: [
    NavbarComponent,
    MatIconModule,
    CalendarComponent,
    ModalComponent,
    IconComponent,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class AppComponent {
  title = 'ang-project';
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

//platformBrowserDynamic().bootstrapModule(AppComponent).catch(err => console.error(err));
