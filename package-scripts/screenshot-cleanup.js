import fs from 'fs'
import path from 'path'

// Clean up old screenshots before running new tests
const oldScreenshotsDir = path.join(process.cwd(), 'tests', '__screenshots__')
const manualScreenshotsDir = path.join(process.cwd(), 'tests', 'manual-screenshots')

function cleanupOldScreenshots() {
  console.log('🧹 Cleaning up old screenshots...')
  
  // Remove old Vitest screenshots
  if (fs.existsSync(oldScreenshotsDir)) {
    fs.rmSync(oldScreenshotsDir, { recursive: true, force: true })
    console.log('✓ Removed old Vitest screenshots')
  }
  
  // Remove manual screenshots from previous runs
  if (fs.existsSync(manualScreenshotsDir)) {
    fs.rmSync(manualScreenshotsDir, { recursive: true, force: true })
    console.log('✓ Removed old manual screenshots')
  }
  
  console.log('🎉 Screenshot cleanup complete!')
}

cleanupOldScreenshots()