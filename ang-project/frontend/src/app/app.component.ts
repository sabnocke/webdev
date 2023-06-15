import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { CalendarComponent } from './calendar/calendar.component';
//import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  imports: [NavbarComponent, MatIconModule, CalendarComponent],
})
export class AppComponent {
  title = 'ang-project';
}

//platformBrowserDynamic().bootstrapModule(AppComponent).catch(err => console.error(err));
