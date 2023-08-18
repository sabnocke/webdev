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
  constructor(private eos: EntryObserverService, private elRef: ElementRef) {}
  arrayOfNames: string[] = [];
  ngAfterViewInit() {
    const loadedData = localStorage.getItem('names');
    if (this.arrayOfNames.length === 0) {
      this.arrayOfNames = loadedData ? JSON.parse(loadedData) : [];
    }
    this.eos.getData().subscribe((data) => {
      console.log('Received (eos): ', data);
      this.arrayOfNames =
        data.length > 0 ? data : loadedData ? JSON.parse(loadedData) : [];
    });
    // const entryReg = this.elRef.nativeElement.querySelector('#entryReg');
  }
}
