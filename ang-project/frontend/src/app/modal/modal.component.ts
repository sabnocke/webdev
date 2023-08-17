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
import { EntriesComponent } from '../entries/entries.component';
import { EntryObserverService } from '../entryobserver.service';
import { DxoWidthModule } from 'devextreme-angular/ui/nested';
import { WayfarerService } from '../wayfarer.service';
import { DateTime } from 'luxon';

interface InputValues {
  [key: string]: boolean;
}
interface ValueDB {
  name: string;
  date: DateTime;
  hours: string;
  dateChosen: boolean;
}
interface stringDB {
  [key: string]: string;
}
interface loading {
  name: string;
  time: Date;
  names: string;
}

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
  time: 'To:' | 'Hours:' | 'undefined' = 'undefined';

  days: stringDB = {
    '1': 'Pondělí',
    '2': 'Úterý',
    '3': 'Středa',
    '4': 'Čtvrtek',
    '5': 'Pátek',
    '6': 'Sobota',
    '7': 'Neděle',
  };
  months: stringDB = {
    '0': 'leden',
    '1': 'únor',
    '2': 'březen',
    '3': 'duben',
    '4': 'květen',
    '5': 'červen',
    '6': 'červenec',
    '7': 'srpen',
    '8': 'září',
    '9': 'říjen',
    '10': 'listopad',
    '11': 'prosinec',
  };

  inputs: string[] = [];
  vDB: ValueDB = {} as ValueDB;
  eventData = [] as any[];

  constructor(
    private elRef: ElementRef,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private wf: WayfarerService
  ) {}

  addWeekdays(date: Date, weekdays: number): Date {
    const result = new Date(date);
    let addedWeekdays = 0;
    while (addedWeekdays < weekdays) {
      result.setDate(result.getDate() + 1);
      //does this ever trigger?
      if (result.getDay() === 0 || result.getDay() === 6) {
        result.setDate(result.getDate() + 1);
      }
    }
    return result;
  }

  calculateProperDay(hours: string): DateTime {
    const now = DateTime.now();
    let later = DateTime.now();
    const propHours = parseInt(hours);
    console.log('later', later.toLocaleString(DateTime.DATETIME_FULL));
    later = later.plus({ hours: propHours });
    console.log('hours:', propHours);
    console.log('later', later.toLocaleString(DateTime.DATETIME_FULL));

    /*
    const dayCount = Math.floor(propHours / 24);
    let remainingHours = dayCount > 1 ? dayCount % 24 : propHours;
    later.setDate(later.getDate() + dayCount);
    if (later.getHours() + remainingHours >= 24) {
      later.setDate(later.getDate() + 1);
      remainingHours = remainingHours + later.getHours() - 24;
    }
    console.log(later.getDate() + 1);
    console.log('remaining hours: ', later.getHours() + remainingHours);
    later.setHours(remainingHours);
    console.log('remain: ', remainingHours);
    console.log('later: ', later.toISOString());*/
    return later;
  }

  provideData(data: loading) {
    console.log('names:', data.names);
    let event = {
      title: data.name,
      start: new Date().toISOString(),
      end: data.time.toISOString(),
      description: data.names,
    };
    this.wf.addData(event);
    console.log('given: ', event);
  }
  findCheckedInputs(content: HTMLDivElement) {
    //const bank = eos.load();
    const inputElements: NodeListOf<HTMLInputElement> =
      content.querySelectorAll("input[type='checkbox']");
    let inputValues: string[] = [];

    inputElements.forEach((element: HTMLInputElement) => {
      const elementName = element.getAttribute('name');
      const isChecked = element.checked;
      if (elementName && isChecked) {
        inputValues.push(elementName);
        //console.log(`name: ${elementName}; isChecked: ${isChecked}`);
      }
    });
    return inputValues;
  }
  findFilledObjects(): ValueDB {
    const basic = document.querySelectorAll('input');
    const vDB: ValueDB = {} as ValueDB;
    basic.forEach((element: HTMLInputElement) => {
      if (element.id === 'name-box') {
        vDB.name = element.value;
      }
      if (element.id === 'hours-selector') {
        vDB.hours = element.value;
      }
      if (element.id === 'date-selector') {
        vDB.date = DateTime.fromISO(element.value);
      }
    });
    return vDB;
  }
  load(
    name: HTMLInputElement | null,
    names: HTMLInputElement | null,
    time: HTMLInputElement | null
  ) {
    const output = this.elRef.nativeElement.querySelector('#output');
    // console.log('output:', !!output);
    const inputList = output.querySelectorAll("input[type='text']");
    // console.log('inputList:', !!inputList);
    inputList.forEach((element: HTMLInputElement) => {
      // console.log(`${element}'s id: `, element.id);
      if (element.id === 'orderName') {
        console.log('value', element.value);
        name = element;
      }
      if (element.id === 'names') {
        names = element;
      }
      if (element.id === 'time') {
        time = element;
      }
    });
    if (time && name && names) {
      function setTimeFormat(dt: DateTime, days: stringDB, months: stringDB) {
        return dt
          ? `${days[dt.weekday.toString()]} ${dt.day}. ${
              months[dt.month.toString()]
            } ${dt.year}`
          : '0';
      }
      const uneditedTime = this.vDB.date;
      let editedTime = setTimeFormat(uneditedTime, this.days, this.months);
      if (uneditedTime && uneditedTime.isValid) {
        //editedTime =
        this.time = uneditedTime.isValid ? 'To:' : 'undefined';
        this.vDB.dateChosen = true;
      } else if (this.vDB.hours) {
        editedTime =
          this.vDB.hours +
          `\t(${setTimeFormat(
            this.calculateProperDay(this.vDB.hours),
            this.days,
            this.months
          )})`;
        this.time = 'Hours:';
        this.vDB.dateChosen = false;
      } else {
        this.time = 'undefined';
      }
      // console.log('uneditedTime:', typeof uneditedTime);
      // console.log('editedTime:', typeof editedTime);
      time.value = editedTime;
      // console.log('Updated time.value:', time.value);
      name.value = this.vDB.name;
      names.value = this.inputs.join(', ');
      // console.log('names: ', this.inputs.join(', '));
    } else {
      console.log('time element not found');
    }
    let loading = {} as loading;
    loading.name = this.vDB.name;
    loading.names = this.inputs.join(', ');
    console.log('vDB.date', this.vDB.date);
    loading.time = this.vDB.dateChosen
      ? this.vDB.date.toJSDate()
      : this.calculateProperDay(this.vDB.hours).toJSDate();
    console.log('end: ', loading.time);
    return loading;
    //console.log(name.value);
    //time.value = editedTime;
  }

  ngAfterViewInit(): void {
    const entryReg = this.elRef.nativeElement.querySelector('#entryReg');
    console.log(entryReg);
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
    const nextButton3 = document.querySelector('#next-button3');
    const prevButton = document.querySelector('#prev-button');
    const prevButton2 = document.querySelector('#prev-button2');
    const checkAll = document.querySelector('#check-all');
    const basic = document.getElementById('basic');
    const _switch = document.getElementById('switch');
    const name = document.querySelector('orderName') as HTMLInputElement;
    const names = this.elRef.nativeElement.querySelector('names');
    const time = this.elRef.nativeElement.querySelector(
      'time'
    ) as HTMLInputElement;

    let isCheckedAll: boolean = false;

    if (nextButton && basic && _switch) {
      nextButton.addEventListener('click', () => {
        basic.style.display = 'none';
        _switch.style.display = 'inline-block';
        console.log('clicked');
        this.vDB = this.findFilledObjects();
        //console.log(typeof this.vDB.date);
        console.log(this.vDB.date, this.vDB.hours, this.vDB.name);
        console.log(`value: ${this.vDB.date}, type: ${typeof this.vDB.date}`);
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
        console.log(this.findCheckedInputs(entryReg));
        this.inputs = this.findCheckedInputs(entryReg);
        //! HERE
        this.load(name, names, time);
      });
      prevButton2.addEventListener('click', () => {
        this.dialogService.openDialog();
        finalDiag.close();
      });
    }
    if (nextButton3) {
      nextButton3.addEventListener('click', () => {
        const lding = this.load(name, names, time);
        this.provideData(lding);
        finalDiag.close();
        this.closingEvent();
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
