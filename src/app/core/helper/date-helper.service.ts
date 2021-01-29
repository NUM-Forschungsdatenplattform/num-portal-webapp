import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class DateHelperService {
  constructor() {}

  static getDateString(date: Date): string {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  static getTimeString(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
  }

  static getOffsetString(date: Date): string {
    const offset = date.getTimezoneOffset()
    const sign = offset > 0 ? '-' : '+'
    const hours = Math.abs(Math.trunc(offset / 60))
      .toString()
      .padStart(2, '0')
    const minutes = (offset % 60).toString().padStart(2, '0')

    return `${sign}${hours}${minutes}`
  }

  static getIsoString(date: Date): string {
    const dateString = this.getDateString(date)
    const timeString = this.getTimeString(date)
    const offset = this.getOffsetString(date)

    return `${dateString}T${timeString}${offset}`
  }
}
