import { debounceTime } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'num-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup
  constructor() {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      query: new FormControl(),
    })

    this.searchForm
      .get('query')
      .valueChanges.pipe(debounceTime(200))
      .subscribe((value) => {
        console.log(value)
      })
  }

  clearInput(): void {
    if (this.searchForm.value.query) {
      this.searchForm.patchValue({
        query: '',
      })
    }
  }
}
