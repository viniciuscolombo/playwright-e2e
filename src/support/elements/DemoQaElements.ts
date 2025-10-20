import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class DemoQaElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getUserNameField(): Locator {
    return this.page.locator('#userName');
  }

  getUserEmailField(): Locator {
    return this.page.locator('#userEmail');
  }

  getCurrentAddressField(): Locator {
    return this.page.locator('#currentAddress');
  }

  getPermanentAddressField(): Locator {
    return this.page.locator('#permanentAddress');
  }

  getSubmitButton(): Locator {
    return this.page.locator('#submit');
  }

  getOutputArea(): Locator {
    return this.page.locator('#output');
  }
}