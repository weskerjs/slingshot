import * as sinkStatic from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { join } from 'path'

function getStub(...paths: string[]) {
  return join(__dirname, 'templates/migrations', ...paths)
}

function makeWebhookMigration(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  const migrationsDirectory = app.directoriesMap.get('migrations') || 'database'
  const migrationPath = join(migrationsDirectory, `${Date.now()}_webhooks.ts`)

  const template = new sink.files.MustacheFile(projectRoot, migrationPath, getStub('webhooks.txt'))
  if (template.exists()) {
    sink.logger.action('create').skipped(`${migrationPath} file already exists`)
    return
  }

  template.commit()
  sink.logger.action('create').succeeded(migrationPath)
}

function makeWebhookResponsesMigration(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  const migrationsDirectory = app.directoriesMap.get('migrations') || 'database'
  const migrationPath = join(migrationsDirectory, `${Date.now()}_webhook_responses.ts`)

  const template = new sink.files.MustacheFile(
    projectRoot,
    migrationPath,
    getStub('webhook_responses.txt')
  )
  if (template.exists()) {
    sink.logger.action('create').skipped(`${migrationPath} file already exists`)
    return
  }

  template.commit()
  sink.logger.action('create').succeeded(migrationPath)
}

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  makeWebhookMigration(projectRoot, app, sink)
  makeWebhookResponsesMigration(projectRoot, app, sink)
}
