import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalComponent } from '../modal/modal.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import csLocale from '@fullcalendar/core/locales/cs';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import multiMonthPlugin from '@fullcalendar/multimonth';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, ModalComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
})
export class CalendarComponent {
  ngOnInit() {
    const container = document.getElementsByClassName('fc-prev-button');
    console.log(container);
    document.documentElement.style.setProperty(
      '--fc-button-bg-color',
      'rgb(17 24 39)'
    );
  }

  calendarOptions: CalendarOptions = {
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    plugins: [
      dayGridPlugin,
      interactionPlugin,
      timeGridPlugin,
      resourceTimelinePlugin,
      multiMonthPlugin,
      listPlugin,
    ],
    initialView: 'dayGridYear',
    themeSystem: 'standard',
    multiMonthMaxColumns: 1,
    locale: csLocale,
    selectable: true,
    editable: true,
    weekends: false,
    navLinks: true,
    nowIndicator: true,
    firstDay: 1,
    eventMinHeight: 10,
    dateClick: function (info) {
      alert('Clicked on: ' + info.dateStr);
    },
    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday

      startTime: '07:00', // a start time (7am in this example)
      endTime: '18:00', // an end time (6pm in this example)
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridYear,dayGridMonth,listMonth,timeGridWeek,timeGridDay',
    },
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    },
    events: [
      {
        title: 'event1',
        start: '2023-06-16T12:30:00', // YYYY-MM-DD T HH:MM:SS
        end: '2023-06-16T16:00:00',
        allDay: false,
      },
      {
        title: 'doing stuff',
        start: '2023-06-16',
        end: '2023-06-20',
        allDay: true,
      },
      {
        title: 'event2',
        start: '2023-06-16T11:00:00', // YYYY-MM-DD T HH:MM:SS
        end: '2023-06-16T15:30:00',
        allDay: false,
      },
    ],
  };
}
