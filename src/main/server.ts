import 'module-alias/register'
import 'dotenv/config'

import cors from 'cors'
import express, { Router } from 'express'

import { ENV } from '@/config/env'
import { logger } from '@/config/logger'

import { RegisterRoutes } from '@/routes/routes.generated'

const main = (): void => {
  logger.info('Starting server')

  const port = ENV.port
  const app = express()

  app.use(cors())
  app.use(express.json({ limit: '5mb' }))

  const router = Router()
  app.use(router)

  app.use('/static', express.static('public'))

  router.get('/', (req, res) => {
    res.json({
      name: ENV.name,
      date: new Date()
    })
  })

  RegisterRoutes(router)

  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`)
  })
}

main()
