import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.sass'],
})
export class EntriesComponent {
  arrayOfNames: string[] = [];
  ngAfterViewInit() {
    const loaded = localStorage.getItem('names');
    this.arrayOfNames = loaded !== null ? JSON.parse(loaded) : [];
  }
}
