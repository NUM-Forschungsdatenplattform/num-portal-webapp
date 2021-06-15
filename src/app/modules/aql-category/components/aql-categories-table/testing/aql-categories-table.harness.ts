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
// Third Party dependencies

import { AsyncFactoryFn, ComponentHarness, TestElement } from '@angular/cdk/testing'
import { MatMenuItemHarness } from '@angular/material/menu/testing'
import { MatTableHarness, MatTableHarnessColumnsText } from '@angular/material/table/testing'

export class AqlCategoriesTableHarness extends ComponentHarness {
  static hostSelector = '.aql-category-table'

  protected getTable: AsyncFactoryFn<MatTableHarness> = this.locatorFor(MatTableHarness)
  protected getRowMenuButtons: AsyncFactoryFn<TestElement[]> = this.locatorForAll('button')
  protected getMenuItems: AsyncFactoryFn<TestElement[]> = this.locatorForAll('.mat-menu-item')

  async getAllTableRows(): Promise<MatTableHarnessColumnsText> {
    const table = await this.getTable()
    return table.getCellTextByColumnName()
  }

  async getFirstRowTextForColumn(column: string): Promise<string> {
    const tableRows = await this.getAllTableRows()
    return tableRows[column].text[0]
  }

  async getLastRowTextForColumn(column: string): Promise<string> {
    const tableRows = await this.getAllTableRows()
    return tableRows[column].text[tableRows[column].text.length - 1]
  }

  async getMenuButtonForRow(rowNo: number): Promise<TestElement> {
    const tableButtons = await this.getRowMenuButtons()
    return tableButtons[rowNo]
  }

  async getMenuItemByLabel(label: string): Promise<TestElement> {
    const items = await this.getMenuItems()
    return items.find(async (it) => (await it.text()) === label)
  }
}
