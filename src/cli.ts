import { cac } from 'cac'
import * as docs from './helpers/docs'

export const run = async () => {
  // create cac instance
  const program = cac('vuepress-starter')

  const { version } = require('../package.json')
  program.version(version)

  // display help message
  program.help()

  // register `run` command
  program.command('run', 'sample command').action(wrapCommand(docs.buildDocs))

  program.parse(process.argv)
}

const wrapCommand = (cmd: (...args: any[]) => Promise<void>): typeof cmd => {
  const wrappedCommand: typeof cmd = (...args) =>
    cmd(...args).catch(error => {
      console.error(error)
      process.exit(1)
    })
  return wrappedCommand
}
