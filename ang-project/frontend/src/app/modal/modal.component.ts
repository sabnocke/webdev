import {
  Component,
  ElementRef,
  ChangeDetectorRef,
  HostListener,
  Host,
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
import { EntriesComponent } from '../entries/entries.component';

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
    MatIconModule,
    CheckboxComponent,
    EntriesComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent {
  naming: string = 'Name Surname';

  radioSwitch: 0 | 1 | 2 | 3 = 0;

  constructor(
    private elRef: ElementRef,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}

  findCheckedInputs(id: string) {
    interface InputValues {
      [key: string]: boolean;
    }

    const parentNode = document.getElementById(id);
    const inputValues: InputValues = {};
    const inputElements: NodeListOf<HTMLInputElement> | [] =
      parentNode !== null
        ? parentNode.querySelectorAll("input[type='checkbox']")
        : [];

    inputElements.forEach((element: HTMLInputElement) => {
      const elementName = element.getAttribute('name');
      const isChecked = element.checked;
      if (elementName && isChecked) {
        inputValues[elementName] = isChecked;
      }
    });
    return inputValues;
  }

  ngAfterViewInit(): void {
    const entryReg = this.elRef.nativeElement.querySelector('#entryReg');

    const dialog = this.elRef.nativeElement.querySelector(
      '#diag'
    ) as HTMLDialogElement;
    const finalDiag = this.elRef.nativeElement.querySelector(
      '#finalDiag'
    ) as HTMLDialogElement;
    this.cdr.detectChanges();
    this.dialogService.setDialog(dialog);

    const nextButton = document.querySelector('#next-button');
    const nextButton2 = document.querySelector('#next-button2');
    const prevButton = document.querySelector('#prev-button');
    const prevButton2 = document.querySelector('#prev-button2');
    const checkAll = document.querySelector('#check-all');
    const basic = document.getElementById('basic');
    const _switch = document.getElementById('switch');

    let isCheckedAll: boolean = false;

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

    if (nextButton2 && prevButton2) {
      nextButton2.addEventListener('click', () => {
        this.dialogService.closeDialog();
        finalDiag.showModal();
        console.log(this.findCheckedInputs('#entryReg'));
      });
      prevButton2.addEventListener('click', () => {
        this.dialogService.openDialog();
        finalDiag.close();
      });
    }

    if (checkAll) {
      checkAll.addEventListener('click', () => {
        const container: NodeListOf<HTMLElement> =
          document.querySelectorAll('.container');
        container.forEach((element) => {
          const input = element.querySelector('.cbx2') as HTMLInputElement;
          const label = element.querySelector('.actualName') as HTMLElement;
          if (input) {
            input.checked = !isCheckedAll;
            label.style.color = input.checked ? '#a3e583' : '#fff';
          }
        });
        isCheckedAll = !isCheckedAll;
        checkAll.textContent = isCheckedAll ? 'Check All' : 'Uncheck All';
      });
    }

    const radioButton1 = document.getElementById(
      'optionButton1'
    ) as HTMLInputElement;
    const radioButton2 = document.getElementById(
      'optionButton2'
    ) as HTMLInputElement;
    const radioButton3 = document.getElementById(
      'optionButton3'
    ) as HTMLInputElement;

    if (radioButton1 && radioButton2 && radioButton3) {
      radioButton1.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        if (target.checked) {
          this.radioSwitch = 1;
        }
      });
      radioButton2.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        if (target.checked) {
          this.radioSwitch = 2;
        }
      });
      radioButton3.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        if (target.checked) {
          this.radioSwitch = 0;
        }
      });
    }
  }
  closingEvent(): void {
    const basic = document.getElementById('basic');
    const _switch = document.getElementById('switch');
    if (basic && _switch) {
      basic.style.display = 'block';
      _switch.style.display = 'none';
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
    const fDiag = this.elRef.nativeElement.querySelector(
      '#finalDiag'
    ) as HTMLDialogElement;
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeDialog();
      if (fDiag.open) {
        fDiag.close();
      }
      this.closingEvent();
    }
  }
  @HostListener('window:click', ['$event'])
  MouseEvent(event: MouseEvent) {
    const diag = document.querySelector('#diag');
    const fDiag = this.elRef.nativeElement.querySelector(
      '#finalDiag'
    ) as HTMLDialogElement;
    if (event.target === diag) {
      event.preventDefault();
      this.closeDialog();
      this.closingEvent();
    } else if (event.target === fDiag) {
      event.preventDefault();
      fDiag.close();
      this.closingEvent();
    }
  }
}
