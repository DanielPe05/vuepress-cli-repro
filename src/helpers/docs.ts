import path from 'path'
import fs from 'fs-extra'
import { createApp } from 'vuepress'

process.env.NODE_ENV = 'production'

const TEMP_LOCATION = path.resolve('.temp')

export const buildDocs = async () => {
  await checkDocsExistence()
  /**
   * Create the temporary directory and copy docs to it
   */
  await fs.ensureDir(TEMP_LOCATION)
  await fs.copy(`docs/.`, TEMP_LOCATION)

  /**
   * Create and build the app from the docs in the temp directory
   */
  const app = createApp({
    base: '/',
    debug: true,
    source: TEMP_LOCATION,
    bundler: '@vuepress/vite',
    title: `Documentation`,
    description: `Sample project`,
    themeConfig: { sidebarDepth: 2, sidebar: 'auto' }
  })

  await app.init()
  await app.prepare()

  return app.build()
}

const checkDocsExistence = async () => {
  const exists = await fs.pathExists('docs')

  if (!exists) {
    return Promise.reject(`The docs directory doesn't exist: docs`)
  }
}
