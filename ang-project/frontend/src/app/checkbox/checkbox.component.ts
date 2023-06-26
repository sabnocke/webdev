import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass'],
})
export class CheckboxComponent {
  @Input() name!: string;
  @Input() id!: string | number;
  ngAfterViewInit(): void {
    const check = document.getElementById(`${this.id}`) as HTMLInputElement;
    const name = document.getElementById(`${this.name}`) as HTMLElement;
    check.addEventListener('change', (event: any) => {
      if (check.checked) {
        name.style.color = '#a3e583';
      } else {
        name.style.color = '#fff';
      }
    });
  }
}
