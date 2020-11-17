import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { IStudyApi } from 'src/app/shared/models/study/study-api.interface'

@Injectable({
  providedIn: 'root',
})
export class StudyService {
  constructor() {}

  get(id: number): Observable<IStudyApi> {
    // TODO: This is to be implemented
    return of(null)
  }
}
