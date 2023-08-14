import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InhibitorService } from '../inhibitor.service';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent {
  constructor(
    private elRef: ElementRef,
    private sett: InhibitorService,
    private cdr: ChangeDetectorRef
  ) {}
  nameHolder: string[] = [];
  ngAfterViewInit(): void {
    const dialog = this.elRef.nativeElement.querySelector(
      '#diag2'
    ) as HTMLDialogElement;
    const input = this.elRef.nativeElement.querySelector(
      '#in'
    ) as HTMLInputElement;
    const button = document.querySelector('#btt');
    const txtAr = document.querySelector('#txt') as HTMLTextAreaElement;
    this.cdr.detectChanges();
    this.sett.setDialog(dialog);
    if (button && txtAr) {
      button.addEventListener('click', () => {
        const values = txtAr.value;
        console.log(values);
      });
    }
  }
}
/*
  - list of people
  - ? 
*/
