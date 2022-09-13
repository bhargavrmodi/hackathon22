import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {

        month(event: CalendarEvent, title: string): string {
                return event.title;
        }

        /**
         * The month view event tooltip. Return a falsey value from this to disable the tooltip.
         */
        monthTooltip(event: CalendarEvent, title: string): string {
                return event.title.split("##")[0];
        }

        week(event: CalendarEvent, title: string): string {
                return event.title.split("##")[0];
        }

        /**
         * The week view event tooltip. Return a falsey value from this to disable the tooltip.
         */
        weekTooltip(event: CalendarEvent, title: string): string {
                return event.title.split("##")[0];
        }

        /**
         * The day view event title.
         */
        day(event: CalendarEvent, title: string): string {
                return event.title.split("##")[0];
        }

        /**
         * The day view event tooltip. Return a falsey value from this to disable the tooltip.
         */
        dayTooltip(event: CalendarEvent, title: string): string {
                return event.title.split("##")[0];
        }
}
