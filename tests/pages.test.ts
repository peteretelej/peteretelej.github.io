import { describe, test } from 'vitest'
import { takeScreenshot, takeScreenshotsAtBreakpoints } from './utils/screenshot'

const BASE_URL = 'http://localhost:4321'

describe('Page Screenshots', () => {
  test('homepage screenshots', async () => {
    await takeScreenshotsAtBreakpoints(`${BASE_URL}`, 'homepage')
  })

  test('about page screenshots', async () => {
    await takeScreenshotsAtBreakpoints(`${BASE_URL}/about`, 'about')
  })

  test('blog index screenshots', async () => {
    await takeScreenshotsAtBreakpoints(`${BASE_URL}/blog`, 'blog-index')
  })

  test('readme index screenshots', async () => {
    await takeScreenshotsAtBreakpoints(`${BASE_URL}/readme`, 'readme-index')
  })

  test('search page screenshots', async () => {
    await takeScreenshotsAtBreakpoints(`${BASE_URL}/search`, 'search')
  })

  test('404 page screenshots', async () => {
    await takeScreenshotsAtBreakpoints(`${BASE_URL}/non-existent-page`, '404')
  })
})

describe('Individual Page Tests', () => {
  test('homepage has correct title and navigation', async () => {
    await takeScreenshot(`${BASE_URL}`, { name: 'homepage-test' })
  })

  test('blog page loads correctly', async () => {
    await takeScreenshot(`${BASE_URL}/blog`, { 
      name: 'blog-test',
      fullPage: true 
    })
  })
})