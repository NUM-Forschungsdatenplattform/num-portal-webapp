import { DatePipe } from '@angular/common'
import { Pipe, PipeTransform } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Pipe({
  name: 'localizedDate',
  pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(
    private translateService: TranslateService,
    private datePipe: DatePipe
  ) {}

  transform(value: any, pattern = 'mediumDate'): string {
    return this.datePipe.transform(value, pattern, undefined, this.translateService.currentLang)
  }
}
