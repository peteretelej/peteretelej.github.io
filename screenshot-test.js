import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'http://localhost:4321'
const SCREENSHOT_DIR = './tests/manual-screenshots'

// Create screenshots directory
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
}

const pages = [
  { name: 'homepage', url: '/' },
  { name: 'readme-setup-ubuntu-vps', url: '/readme/setup-ubuntu-vps' },
  { name: 'notes', url: '/notes' },
  { name: 'notes-claude-code-tmux', url: '/notes/claude-code-tmux-setup/' },
  { name: 'about', url: '/about' },
  { name: 'readme-git-commands', url: '/readme/git-commands-quick-dirty-git-shortcuts' }
]

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'large-desktop', width: 1920, height: 1080 }
]

async function takeScreenshots() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  
  try {
    for (const page of pages) {
      for (const viewport of viewports) {
        console.log(`Testing ${page.name} at ${viewport.name} (${viewport.width}x${viewport.height})`)
        
        const puppeteerPage = await browser.newPage()
        await puppeteerPage.setViewport({ width: viewport.width, height: viewport.height })
        
        const url = `${BASE_URL}${page.url}`
        await puppeteerPage.goto(url, { waitUntil: 'networkidle2', timeout: 10000 })
        
        // Wait a bit for any animations
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Take light mode screenshot
        const lightPath = path.join(SCREENSHOT_DIR, `${page.name}-${viewport.name}-light.png`)
        await puppeteerPage.screenshot({ 
          path: lightPath, 
          fullPage: true,
          type: 'png'
        })
        console.log(`✓ Light mode screenshot saved: ${lightPath}`)
        
        // Try to toggle dark mode
        try {
          const themeButton = await puppeteerPage.$('button[aria-label*="Switch to"]')
          if (themeButton) {
            await themeButton.click()
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            // Take dark mode screenshot
            const darkPath = path.join(SCREENSHOT_DIR, `${page.name}-${viewport.name}-dark.png`)
            await puppeteerPage.screenshot({ 
              path: darkPath, 
              fullPage: true,
              type: 'png'
            })
            console.log(`✓ Dark mode screenshot saved: ${darkPath}`)
          } else {
            console.log(`⚠ No theme toggle found on ${page.name}`)
          }
        } catch (error) {
          console.log(`⚠ Could not toggle theme on ${page.name}:`, error.message)
        }
        
        await puppeteerPage.close()
      }
    }
  } catch (error) {
    console.error('Screenshot test failed:', error)
  } finally {
    await browser.close()
  }
}

console.log('Starting screenshot tests...')
console.log(`Target URL: ${BASE_URL}`)
console.log(`Screenshot directory: ${SCREENSHOT_DIR}`)

takeScreenshots()
  .then(() => {
    console.log('✅ Screenshot tests completed!')
    console.log(`Check the screenshots in: ${SCREENSHOT_DIR}`)
  })
  .catch(error => {
    console.error('❌ Screenshot tests failed:', error)
    process.exit(1)
  })