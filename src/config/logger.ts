import pino, { Logger as PinoLogger } from 'pino'

import { ENV, Environment } from './env'

type Context = Record<string, unknown> | Error

const processContext = (...contexts: Array<Context>): Context => {
  const errorContext = contexts.find((context) => context instanceof Error)

  const nonErrorContext = contexts.find(
    (context) => !(context instanceof Error)
  )

  return {
    ...processContextHelper(errorContext),
    ...processContextHelper(nonErrorContext)
  }
}

const processContextHelper = (context?: Context): Context => {
  if (!context) return {}

  if (context instanceof Error) {
    return { error: { message: context.message, stack: context.stack } }
  }

  return context
}

class Logger {
  constructor() {
    const shouldApplyPretty = ENV.environment === Environment.LOCALHOST

    this.pinoLogger = pino({
      msgPrefix: `[BIFROST-${ENV.environment}]`,
      messageKey: 'message',
      formatters: {
        level(level) {
          return { level }
        }
      },
      transport: shouldApplyPretty
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              messageKey: 'message',
              translateTime: 'HH:MM:ss',
              ignore: 'pid,hostname'
            }
          }
        : undefined
    })
  }

  private pinoLogger: PinoLogger

  public debug(message: string, ...contexts: Array<Context>): void {
    const logMessage = { ...processContext(...contexts), message }
    this.pinoLogger.debug(logMessage)
  }

  public info(message: string, ...contexts: Array<Context>): void {
    const logMessage = { ...processContext(...contexts), message }
    this.pinoLogger.info(logMessage)
  }

  public warn(message: string, ...contexts: Array<Context>): void {
    const logMessage = { ...processContext(...contexts), message }
    this.pinoLogger.warn(logMessage)
  }

  public error(message: string, ...contexts: Array<Context>): void {
    const logMessage = { ...processContext(...contexts), message }
    this.pinoLogger.error(logMessage)
  }

  public fatal(message: string, ...contexts: Array<Context>): void {
    const logMessage = { ...processContext(...contexts), message }
    this.pinoLogger.fatal(logMessage)
  }
}

export const logger = new Logger()
