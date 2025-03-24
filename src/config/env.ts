export enum Environment {
  DEV = 'dev',
  PROD = 'prod',
  LOCALHOST = 'localhost'
}

const defaultPort = 8080

export const ENV = {
  name: process.env.NAME ?? 'web-church',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : defaultPort,
  environment:
    (process.env.ENV ? (process.env.ENV as Environment) : undefined) ??
    Environment.LOCALHOST
}
