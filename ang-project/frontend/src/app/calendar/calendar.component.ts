import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
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
import { event } from 'jquery';

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
    editable: false, // was true
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

    events: [
      {
        title: 'title',
        content: 'content',
        start: new Date(),
        display: 'list-item', // block | background
      },
      {
        title: 'name',
        start: new Date(),
        end: new Date().setHours(new Date().getDate() + 1),
        display: 'list-item',
      },
    ],
    eventMouseEnter() {
      console.log('mouse touched event');
    },
    eventClick() {
      // const el = document.createElement('div');
      // el.innerText = 'Text';
      // document.appendChild(el);
    },
    eventContent(render) {
      const title = render.event.title;
      const start = render.event.start;
      const end = render.event.end;
      const desc = render.event.extendedProps['description'];
      const betterStart = start
        ? DateTime.fromJSDate(start).toLocaleString(DateTime.DATETIME_FULL)
        : null;
      const betterEnd = end
        ? DateTime.fromJSDate(end).toLocaleString(DateTime.DATETIME_FULL)
        : null;
      let isClicked = true;
      const eventDiv = document.createElement('div');
      eventDiv.innerHTML = title;
      eventDiv.addEventListener('mouseenter', () => {
        eventDiv.innerHTML = `<b>${title ? title : 'default'}</b><br>
        Start: ${betterStart ? betterStart : 'undefined'}<br>
        End: ${betterEnd ? betterEnd : 'undefined'}<br>
        Names: ${desc ? desc : 'undefined'}
        `;
        //eventDiv.style.backgroundColor = 'lightblue';
      });
      eventDiv.addEventListener('mouseleave', () => {
        eventDiv.innerHTML = title;
        //eventDiv.style.backgroundColor = ''; //? resets backgroundColor?
      });
      eventDiv.addEventListener('click', () => {
        console.log(`Clicked ${isClicked}`);
        if (!isClicked) {
          eventDiv.innerHTML = title;
          console.log('simple view');
        } else {
          console.log('detail view');
          eventDiv.innerHTML = `<b>${title ? title : 'default'}</b><br>
        Start: ${betterStart ? betterStart : 'undefined'}<br>
        End: ${betterEnd ? betterEnd : 'undefined'}<br>
        Names: ${desc ? desc : 'undefined'}
        `;
        }
        isClicked = !isClicked;
      });

      return { domNodes: [eventDiv] };
    },
  };

  ngAfterViewInit() {
    //this.wf.estimateAvailibleMemory();
    const calendarEl = document.getElementById('calendarDivEl');
    let calendar: Calendar;
    // let calendarApi = this.calendarComponent.getApi();
    //calendarApi.next();
    if (calendarEl) {
      console.log('calendar element found');
      calendar = new Calendar(calendarEl, this.calendarOptions);
      calendar.render();
      // calendar.addEvent({
      // title: 'New event',
      // start: new Date(),
      // allDay: true,
      // });
      if (calendar) {
        this.wf.getData().subscribe((data) => {
          console.log('obtained: ', data);
          calendar.addEvent(data);
          console.log('events:\n', this.calendarOptions.events);
          console.log('givenEvents', this.wf.accessDataSet());
          calendar.render();
        });
      }
    } else {
      console.log('calendar element not found');
    }
  }
}
