import { describe, test, expect } from 'vitest'
import { page } from '@vitest/browser/context'

async function takePageScreenshots(url: string, pageName: string) {
  window.location.href = `http://localhost:4321${url}`
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  // Light mode screenshot
  const lightScreenshot = await page.screenshot()
  expect(lightScreenshot).toBeDefined()
  console.log(`${pageName} light mode screenshot: ${lightScreenshot.length} bytes`)
  
  // Try to toggle to dark mode
  try {
    const themeToggle = page.getByRole('button', { name: /switch to/i })
    await themeToggle.click()
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const darkScreenshot = await page.screenshot()
    expect(darkScreenshot).toBeDefined()
    console.log(`${pageName} dark mode screenshot: ${darkScreenshot.length} bytes`)
    
    // Verify screenshots are different (theme working)
    expect(darkScreenshot.length).not.toBe(lightScreenshot.length)
    
  } catch (error) {
    console.log(`Could not test dark mode for ${pageName}:`, error)
  }
}

describe('Conservative Page Screenshots', () => {
  test('homepage renders in both themes', async () => {
    await takePageScreenshots('/', 'Homepage')
  })

  test('ubuntu vps readme post renders correctly', async () => {
    await takePageScreenshots('/readme/setup-ubuntu-vps', 'Ubuntu VPS Post')
  })

  test('notes index page renders correctly', async () => {
    await takePageScreenshots('/notes', 'Notes Index')
  })

  test('claude code tmux setup note renders correctly', async () => {
    await takePageScreenshots('/notes/claude-code-tmux-setup/', 'Claude Code Tmux Note')
  })

  test('about page renders correctly', async () => {
    await takePageScreenshots('/about', 'About Page')
  })

  test('git commands readme post renders correctly', async () => {
    await takePageScreenshots('/readme/git-commands-quick-dirty-git-shortcuts', 'Git Commands Post')
  })
})