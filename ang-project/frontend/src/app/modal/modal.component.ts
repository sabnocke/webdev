import {
  Component,
  ElementRef,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { DialogService } from '../dialog-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(
    private elRef: ElementRef,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    const dialog = this.elRef.nativeElement.querySelector(
      '#diag'
    ) as HTMLDialogElement;
    this.cdr.detectChanges();
    this.dialogService.setDialog(dialog);
  }
  openDialog(): void {
    this.dialogService.openDialog();
  }
  closeDialog(): void {
    this.dialogService.closeDialog();
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeDialog();
    }
  }
}
