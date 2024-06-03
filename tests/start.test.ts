import { test, expect } from '@playwright/test'

const password = 'dahgdfteDSdashj12'

test.beforeEach(async ({ page }) => {
  await page.goto('localhost:8080/signup')
})

test.describe('signup form tests', () => {
  test('submit button is disabled with invalid input data', async ({
    page,
  }) => {
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

    expect(page.locator('.MuiButton-sizeMedium')).toBeDisabled()
  })

  test('signing up works for a new account', async ({ page }) => {
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

    expect(page.url()).toBe('http://localhost:8080/')
    expect(page.getByText('Log out')).toBeVisible()
  })
})
