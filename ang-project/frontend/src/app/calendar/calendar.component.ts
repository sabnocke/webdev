import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ModalComponent } from '../modal/modal.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import csLocale from '@fullcalendar/core/locales/cs';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import multiMonthPlugin from '@fullcalendar/multimonth';
import listPlugin from '@fullcalendar/list';
import { Tooltip } from 'flowbite';
import { WayfarerService } from '../wayfarer.service';
import { DateTime } from 'luxon';
import tippy from 'tippy.js';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, ModalComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
})
export class CalendarComponent {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  ngOnInit() {
    document.documentElement.style.setProperty(
      '--fc-button-bg-color',
      'rgb(17 24 39)'
    );
  }
  constructor(private wf: WayfarerService) {}
  dataField = [];
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
      meridiem: false,
    },
    eventContent(eventInfo) {
      const title = eventInfo.event.title;
      const start = eventInfo.event.start;
      const end = eventInfo.event.end;
      const betterStart = start
        ? DateTime.fromJSDate(start).toLocaleString(DateTime.DATETIME_FULL)
        : null;
      const betterEnd = end
        ? DateTime.fromJSDate(end).toLocaleString(DateTime.DATETIME_FULL)
        : null;
      const description = eventInfo.event.extendedProps['description'];
      return {
        html: `<b>${title}</b><br>
        Start: ${betterStart}<br>
        End: ${betterEnd}<br>
        Names: ${description}
        
        `,
      };
    },
    eventDidMount(info) {
      const eventElement = info.el;
      const desc = info.event.extendedProps['description'];
      tippy(eventElement, {
        content: desc,
        placement: 'top',
        theme: 'custom',
      });
    },
  };
  someMethod() {}
  ngAfterViewInit() {
    let calendarApi = this.calendarComponent.getApi();
    //calendarApi.next();
    this.wf.getData().subscribe((data) => {
      console.log('obtained: ', data);
      this.calendarOptions.events = data;
      console.log('events: ', this.calendarOptions.events);
      calendarApi.render();
    });
  }
}
