/**
 * Copyright 2021 Vitagroup AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit } from '@angular/core'
import { AqlCategoryService } from 'src/app/core/services/aql-category/aql-category.service'
import { AqlService } from 'src/app/core/services/aql/aql.service'

@Component({
  selector: 'num-aqls',
  templateUrl: './aqls.component.html',
  styleUrls: ['./aqls.component.scss'],
})
export class AqlsComponent implements OnInit {
  constructor(private aqlCategoryService: AqlCategoryService, private aqlService: AqlService) {}

  ngOnInit(): void {
    this.aqlService.getAll().subscribe()
    this.aqlCategoryService.getAll().subscribe()
  }
}
