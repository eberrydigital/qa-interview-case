import { test, expect } from '@playwright/test'
import { existingUsers } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    await page.goto('localhost:8080/login')

    const existingUser = existingUsers[0]

    await page
      .locator('#root form div:nth-child(1) > div > input')
      .pressSequentially(existingUser.email)

    await page
      .locator('#root form div:nth-child(2) > div > input')
      .pressSequentially(existingUser.password)

    // Submit button
    const button = page.locator('form .MuiButton-sizeMedium')
    // Click on the button
    button.click()

    // Wait for 1 second until page is fully loaded
    await page.waitForTimeout(1000)
    await expect(page.getByText('Log out')).toBeVisible()
  })
})
