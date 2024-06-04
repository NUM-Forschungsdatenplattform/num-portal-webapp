import { AsyncFactoryFn, ComponentHarness, TestElement } from '@angular/cdk/testing'

export class PatientCountInfoHarness extends ComponentHarness {
  static hostSelector = 'num-patient-count-info'

  protected getParagraph: AsyncFactoryFn<TestElement> = this.locatorFor('p')

  async getCountText(): Promise<string> {
    const paragraphElement = await this.getParagraph()
    return paragraphElement.text()
  }
}
