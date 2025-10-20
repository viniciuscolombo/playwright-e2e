import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import DemoQaPage from '../support/pages/DemoQaPage';

test.describe('Testes no DemoQA Text Box', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let demoQaPage: DemoQaPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.demoqa_QA') 
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    demoQaPage = new DemoQaPage(page);
    await page.goto(BASE_URL);
  });

  test('Preencher formulário text-box com sucesso', async () => {
    await demoQaPage.preencherFormularioTextBox();
    await demoQaPage.validarEnvioFormulario();
  });
});