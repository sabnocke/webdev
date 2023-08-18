import {
  Component,
  ElementRef,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InhibitorService } from '../inhibitor.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { MatIconModule } from '@angular/material/icon';
import { EntryObserverService } from '../entryobserver.service';
import { data } from 'jquery';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, CheckboxComponent, MatIconModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent {
  constructor(
    private elRef: ElementRef,
    private sett: InhibitorService,
    private cdr: ChangeDetectorRef,
    private eos: EntryObserverService
  ) {}
  nameHolder: Set<string> = new Set<string>();
  saveSettings() {
    const txtAr = document.querySelector('#txt') as HTMLTextAreaElement;
    const values = txtAr.value.split('\n');
    values.forEach((value) => {
      this.nameHolder.add(value);
    });
    // localStorage.setItem('names', JSON.stringify(Array.from(this.nameHolder)));
    this.eos.addData(Array.from(this.nameHolder));
    console.log('Given (eos): \n', this.nameHolder);
  }
  loadSettings(key: string) {
    if (key !== null) {
      const txtAr = document.querySelector('#txt') as HTMLTextAreaElement;
      const loaded = localStorage.getItem(key);
      const data: string[] = loaded !== null ? JSON.parse(loaded) : {};
      if (data && data.length > 0) {
        txtAr.value = data.join('\n');
      }
      // this.eos.addData(data);
    }
  }
  ngAfterViewInit(): void {
    const dialog = this.elRef.nativeElement.querySelector(
      '#diag2'
    ) as HTMLDialogElement;
    const input = this.elRef.nativeElement.querySelector(
      '#in'
    ) as HTMLInputElement;
    const button = this.elRef.nativeElement.querySelector(
      '#btt'
    ) as HTMLButtonElement;
    this.loadSettings('names');
    this.cdr.detectChanges();
    this.sett.setDialog(dialog);
    if (button) {
      //Once save is clicked
      button.addEventListener('click', () => {
        this.saveSettings();
      });
    }
  }

  closeSettings() {
    this.saveSettings();
    // location.reload();
    this.sett.closeDialog();
  }
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeSettings();
    }
  }
}
