import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { CalendarComponent } from './calendar/calendar.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ModalComponent } from './modal/modal.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  imports: [NavbarComponent, MatIconModule, CalendarComponent, ModalComponent],
})
export class AppComponent {
  title = 'ang-project';
  somefunc() {
    alert('pressed!');
  }
}

//platformBrowserDynamic().bootstrapModule(AppComponent).catch(err => console.error(err));
