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
  arrayOfNames: string[] = [
    'Name Surname',
    'John Doe',
    'Guy Fawkes',
    'Lr8F9G7fXm',
    'P2sD4qR0wY',
    'K6jU3V1bNc',
    'T9aS5Z3eQv',
    'W5hX8M6kLi',
    'O7gC1B2nRp',
    'E4dF6o9uPt',
    'H3yG5T7lQw',
    'I9jK2S4pFx',
    'N6mR8V2bHc',
  ];
}
