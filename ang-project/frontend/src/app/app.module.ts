import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    //AppComponent
  ],
  imports: [
    BrowserModule,
    NavbarComponent,
    AppComponent,
    MatIconModule,
    FullCalendarModule,
    MatDialogModule,
    CalendarComponent,
  ],
  providers: [],
})
export class AppModule {}
