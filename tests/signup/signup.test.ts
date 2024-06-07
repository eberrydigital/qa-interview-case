import { test, expect, Page } from '@playwright/test'

const password = 'dahgdfteDSdashj12'

test.describe.configure({ mode: 'serial' })

test.describe('signup form tests', () => {
  test('submit button is disabled with invalid input data', async ({
    page,
  }) => {
    await page.goto('localhost:8080/signup')

    await page
      .locator('#root form div:nth-child(1) > div > input')
      .pressSequentially('John')
    await page
      .locator('#root form div:nth-child(2) > div > input')
      .pressSequentially('Smith')

    await page
      .locator('#root form div:nth-child(3) > div > input')
      .pressSequentially('invalidEmail')

    await page
      .locator('#root form div:nth-child(4) > div > input')
      .pressSequentially(password)

    await expect(page.locator('.MuiButton-sizeMedium')).toBeDisabled()
  })

  test('signing up and being logged in works for a new account', async ({
    page,
  }) => {
    await page.goto('localhost:8080/signup')

    await page
      .locator('#root form div:nth-child(1) > div > input')
      .pressSequentially('John')
    await page
      .locator('#root form div:nth-child(2) > div > input')
      .pressSequentially('Smith')

    await page
      .locator('#root form div:nth-child(3) > div > input')
      .pressSequentially('john.smith@mail.com')

    await page
      .locator('#root form div:nth-child(4) > div > input')
      .pressSequentially(password)

    await page.locator('.MuiButton-sizeMedium').click()

    page.waitForURL('http://localhost:8080/')
    await expect(page.getByText('Log out')).toBeVisible()
  })

  test('signup page contains information about company (localized)', async ({
    page,
  }) => {
    await page.goto('localhost:8080/signup')

    await useSwedishLanguage(page)

    await expect(page.getByText('Vi är ett bra företag')).toBeVisible()
    await expect(page.getByText('Gratis frukost!')).toBeVisible()
  })
})

const useSwedishLanguage = async (page: Page): Promise<void> => {
  await page.getByLabel('EN').click()
  await page.getByRole('option', { name: 'SV' }).click()
}
