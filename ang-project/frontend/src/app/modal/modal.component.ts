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
import { MatIconModule } from '@angular/material/icon';
import { CheckboxComponent } from '../checkbox/checkbox.component';
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
    MatIconModule,
    CheckboxComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent {
  naming: string = 'Name Surname';

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

    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('#prev-button');
    const basic = document.getElementById('basic');
    const _switch = document.getElementById('switch');

    if (nextButton && basic && _switch) {
      nextButton.addEventListener('click', () => {
        basic.style.display = 'none';
        _switch.style.display = 'inline-block';
        console.log('clicked');
      });
    }
    if (prevButton && basic && _switch) {
      prevButton.addEventListener('click', () => {
        basic.style.display = 'block';
        _switch.style.display = 'none';
        console.log('clicked');
      });
    }
    const d = new Date();
    const dateControl = document.getElementById('dpr') as HTMLInputElement;
    const idl = document.getElementById('idl') as HTMLInputElement;
    const pattern = '/(?::d{2}.[dw]+)/g';

    const isoDate = (): string => {
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const hour = d.getHours();
      const minute = d.getMinutes();
      const dateString = `${year}-${month}-${day}T${hour}:${minute}`;
      return dateString;
    };
    if (dateControl) {
      //alert(`date: ${isoDate()}`);
      dateControl.value = d.toISOString();
      //alert(dateControl.value);
    } else {
      alert('problem');
    }
    if (idl) {
      idl.value = isoDate();
    }
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
