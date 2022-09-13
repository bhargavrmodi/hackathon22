import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LOCALE_ID, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomEventTitleFormatter } from './event-tile-formatter.provider';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  addMinutes
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarView
} from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const colors: any = {
  green_1: {
    primary: '#32CD32',
    secondary: '#FAE3E3'
  },
  green_2: {
    primary: '#006400',
    secondary: '#D1E8FF'
  },
  green_3: {
    primary: '#00FA9A',
    secondary: '#FDF1BA'
  },
  blue_1: {
    primary: '#2E8B57',
    secondary: '#D1E8FF'
  },
  blue_2: {
    primary: '#6B8E23 ',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-icons',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [
    {
        provide: CalendarEventTitleFormatter,
        useClass: CustomEventTitleFormatter
    }
  ]
})
export class EventsComponent extends CalendarEventTitleFormatter {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('modalContent', { static: true }) eventTitleTemplate: TemplateRef<any>;
  datePipe = new DatePipe(this.locale);
  view: CalendarView = CalendarView.Month;
  eventsSelected: CalendarEvent[] = null;
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fa fa-fw fa-pencil"></i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     }
  //   }
  // ];

  refresh: Subject<any> = new Subject();
  datepipe = null;
  events: CalendarEvent[] = [
    {
      start: addHours(subDays(startOfDay(new Date()), 8), 9),
      end: subDays(startOfDay(new Date()), 5),
      title: 'Go Green: Tree Plantation initiative##../../assets/img/greenPlantation.jpg##Attended##50##Raigadh, Pune',
      color: colors.green_1,
      // actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: false,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: addMinutes(addHours(subDays(endOfMonth(new Date()), 3), 15), 1),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'Water Master: Garbage free beach##../../assets/img/cleanBeach.jpg##Registered##100##VarSova Beach, Mumbai',
      color: colors.green_1,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 6),
      end: new Date(),
      title: 'Red Dot: Sustainable Sanitation Awareness##../../assets/img/sanitation.jpg##Attended##40##Kothrud, Pune',
      color: colors.green_1,
      // actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: addDays(addHours(startOfDay(new Date()), 6), 4),
      title: 'Plastifree-city: Plastic collection drive##../../assets/img/plastic.jpg##Not Registered##60##Powerhouse Road, Bhatinda, Punjab',
      color: colors.green_1,
      // actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: addDays(endOfMonth(new Date()), 15),
      title: 'Deutsche Bank WorkShop: Sustainable Entrepreneurship##../../assets/img/entre.jpg##Not Registered##20##VMR: 880881062411, Pin: 1234#',
      color: colors.green_1,
      // actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen = false;

  constructor(public modal: NgbModal, @Inject(LOCALE_ID) public locale: string, private snackBar: MatSnackBar) { super(); }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.eventsSelected = events;
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  registerEvent(eventRegistered) {
    this.events.forEach(event => {
      if (event.title === eventRegistered) {
        event.title = event.title.replace('Not Registered', 'Registered');
        this.snackBar.open("You have successfully registered for " + event.title.split("##")[0] + ".", null, {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    })
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
