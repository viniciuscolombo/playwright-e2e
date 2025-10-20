import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import DemoQaElements from '../elements/DemoQaElements';
import BasePage from './BasePage';

export default class DemoQaPage extends BasePage {
  readonly demoQaElements: DemoQaElements;
  private testData: {
    name: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
  };

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.demoQaElements = new DemoQaElements(page);
    
    this.testData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      currentAddress: faker.location.streetAddress(),
      permanentAddress: faker.location.streetAddress()
    };
  }

  async preencherFormularioTextBox(): Promise<void> {
    await this.demoQaElements.getUserNameField().fill(this.testData.name);
    await this.demoQaElements.getUserEmailField().fill(this.testData.email);
    await this.demoQaElements.getCurrentAddressField().fill(this.testData.currentAddress);
    await this.demoQaElements.getPermanentAddressField().fill(this.testData.permanentAddress);
    
    await this.demoQaElements.getSubmitButton().scrollIntoViewIfNeeded();
    await this.demoQaElements.getSubmitButton().click();
  }

  async validarEnvioFormulario(): Promise<void> {
    const outputArea = this.demoQaElements.getOutputArea();
    await expect(outputArea).toBeVisible();

    await expect(outputArea.locator('#name')).toHaveText(`Name:${this.testData.name}`);
    await expect(outputArea.locator('#email')).toHaveText(`Email:${this.testData.email}`);
    await expect(outputArea.locator('#currentAddress')).toHaveText(`Current Address :${this.testData.currentAddress}`);
    await expect(outputArea.locator('#permanentAddress')).toHaveText(`Permananet Address :${this.testData.permanentAddress}`);
  }
}