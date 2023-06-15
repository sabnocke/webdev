import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { FullCalendarModule } from '@fullcalendar/angular';

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
  ],
  providers: [],
})
export class AppModule {}
