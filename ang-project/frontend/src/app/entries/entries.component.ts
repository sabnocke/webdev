import { Component, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { EntryObserverService } from '../entryobserver.service';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.sass'],
})
export class EntriesComponent {
  constructor(private EOS: EntryObserverService, private elRef: ElementRef) {}
  arrayOfNames: string[] = [];
  ngAfterViewInit() {
    const loaded = localStorage.getItem('names');
    this.arrayOfNames = loaded !== null ? JSON.parse(loaded) : [];
    const entryReg = this.elRef.nativeElement.querySelector('#entryReg');
  }
}
