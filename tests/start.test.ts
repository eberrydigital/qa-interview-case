import { test, expect } from '@playwright/test'
import { existingUsers } from '../test-setup/localstorage.setup'

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

  test('signing up works for a new account', async ({ page }) => {
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

  test('logging in works with existing account', async ({ page }) => {
    await page.goto('localhost:8080/login')

    console.log(await page.context().storageState())

    const existingUser = existingUsers[0]

    await page
      .locator('#root form div:nth-child(1) > div > input')
      .pressSequentially(existingUser.email)

    await page
      .locator('#root form div:nth-child(2) > div > input')
      .pressSequentially(existingUser.password)

    await page.locator('form .MuiButton-sizeMedium').click()

    page.waitForURL('http://localhost:8080/')
    console.log(await page.context().storageState())
    await expect(page.getByText('Log out')).toBeVisible()
  })
})
