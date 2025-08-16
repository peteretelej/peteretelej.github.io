import { page } from '@vitest/browser/context'

export interface ScreenshotOptions {
  name?: string
  viewport?: { width: number; height: number }
  fullPage?: boolean
  quality?: number
  darkMode?: boolean
}

export async function takeScreenshot(
  options: ScreenshotOptions = {}
) {
  const {
    name = 'screenshot',
    viewport = { width: 1280, height: 720 },
    fullPage = false,
    quality = 80,
    darkMode = false
  } = options

  await page.viewport(viewport.width, viewport.height)
  
  // Handle dark mode by clicking the theme toggle if needed
  if (darkMode) {
    try {
      const themeToggle = page.getByRole('button', { name: /switch to light mode|switch to dark mode/i })
      const currentMode = await themeToggle.getAttribute('aria-label')
      
      // If it says "Switch to dark mode", we're in light mode and need to click
      if (currentMode && currentMode.includes('dark')) {
        await themeToggle.click()
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } catch (error) {
      console.log('Could not find theme toggle, taking screenshot with current theme')
    }
  } else {
    try {
      const themeToggle = page.getByRole('button', { name: /switch to light mode|switch to dark mode/i })
      const currentMode = await themeToggle.getAttribute('aria-label')
      
      // If it says "Switch to light mode", we're in dark mode and need to click
      if (currentMode && currentMode.includes('light')) {
        await themeToggle.click()
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } catch (error) {
      console.log('Could not find theme toggle, taking screenshot with current theme')
    }
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const themeSuffix = darkMode ? '-dark' : '-light'
  const filename = `${name}${themeSuffix}-${timestamp}.png`
  
  const screenshotBuffer = await page.screenshot({
    fullPage,
    type: 'png'
  })
  
  console.log(`Screenshot taken: ${filename}`)
  console.log(`Viewport: ${viewport.width}x${viewport.height}`)
  console.log(`Theme: ${darkMode ? 'dark' : 'light'}`)
  console.log(`Screenshot size: ${screenshotBuffer.length} bytes`)
  
  return { filename, screenshot: screenshotBuffer, viewport, theme: darkMode ? 'dark' : 'light' }
}

export async function takeScreenshotsAtBreakpoints(
  url: string,
  name: string,
  breakpoints = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 720 },
    { name: 'wide', width: 1920, height: 1080 }
  ]
) {
  const screenshots = []
  
  for (const breakpoint of breakpoints) {
    const result = await takeScreenshot(url, {
      name: `${name}-${breakpoint.name}`,
      viewport: { width: breakpoint.width, height: breakpoint.height },
      fullPage: true
    })
    screenshots.push({ 
      breakpoint: breakpoint.name, 
      filename: result.filename,
      screenshot: result.screenshot,
      theme: result.theme 
    })
  }
  
  return screenshots
}

export async function takeScreenshotsWithThemes(
  url: string,
  name: string,
  breakpoints = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 720 },
    { name: 'wide', width: 1920, height: 1080 }
  ]
) {
  const screenshots = []
  const themes = [false, true] // light, dark
  
  for (const darkMode of themes) {
    for (const breakpoint of breakpoints) {
      const result = await takeScreenshot(url, {
        name: `${name}-${breakpoint.name}`,
        viewport: { width: breakpoint.width, height: breakpoint.height },
        fullPage: true,
        darkMode
      })
      screenshots.push({ 
        breakpoint: breakpoint.name, 
        filename: result.filename,
        screenshot: result.screenshot,
        theme: result.theme 
      })
    }
  }
  
  return screenshots
}