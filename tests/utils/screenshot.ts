import { page } from '@vitest/browser/context'
import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

export interface ScreenshotOptions {
  name?: string
  viewport?: { width: number; height: number }
  fullPage?: boolean
  quality?: number
}

export async function takeScreenshot(
  url: string,
  options: ScreenshotOptions = {}
) {
  const {
    name = 'screenshot',
    viewport = { width: 1280, height: 720 },
    fullPage = false,
    quality = 80
  } = options

  await page.setViewportSize(viewport)
  await page.goto(url)
  await page.waitForLoadState('networkidle')

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `${name}-${timestamp}.png`
  const filepath = `tests/screenshots/${filename}`

  await mkdir(dirname(filepath), { recursive: true })
  
  await page.screenshot({
    path: filepath,
    fullPage,
    quality,
    type: 'png'
  })

  console.log(`Screenshot saved: ${filepath}`)
  return filepath
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
    const filepath = await takeScreenshot(url, {
      name: `${name}-${breakpoint.name}`,
      viewport: { width: breakpoint.width, height: breakpoint.height },
      fullPage: true
    })
    screenshots.push({ breakpoint: breakpoint.name, filepath })
  }
  
  return screenshots
}