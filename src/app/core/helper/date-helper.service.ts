import { Injectable } from '@angular/core'
import moment from 'moment'

@Injectable({
  providedIn: 'root',
})
export class DateHelperService {
  constructor() {}
  static getDateString(date: moment.Moment): string {
    if (!date.isValid) {
      date = moment(date)
    }
    const d = date.toDate()
    const year = d.getFullYear()
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const day = d.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }
  //we switched from javascript Date to Momentjs (https://momentjs.com/). If we need to support timebased funtions the cide below needs to be changed, too
  static getTimeString(date: moment.Moment): string {
    console.log('date: ', date)
    const hours = date.hours().toString().padStart(2, '0')
    const minutes = date.minutes().toString().padStart(2, '0')
    const seconds = date.seconds().toString().padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
  }

  static getOffsetString(date: moment.Moment): string {
    const offset = date.toDate().getTimezoneOffset()
    const sign = offset > 0 ? '-' : '+'
    const hours = Math.abs(Math.trunc(offset / 60))
      .toString()
      .padStart(2, '0')
    const minutes = (offset % 60).toString().padStart(2, '0')

    return `${sign}${hours}${minutes}`
  }

  static getIsoString(date: moment.Moment): string {
    const momentDate = moment(date)
    const dateString = this.getDateString(momentDate)
    const timeString = this.getTimeString(momentDate)
    const offset = this.getOffsetString(momentDate)

    return `${dateString}T${timeString}${offset}`
  }
}
