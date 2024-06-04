// Third Party dependencies

import { AsyncFactoryFn, ComponentHarness, TestElement } from '@angular/cdk/testing'
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
