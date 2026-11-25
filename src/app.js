import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.router.js'
import mocksRouter from './routes/mocks.router.js'
import deliveryRouter from './routes/delivery.router.js'
import orderRouter from './routes/order.router.js'
import storeRouter from './routes/store.router.js'
import { notFoundRoute } from './middlewares/notFoundRoute.js'
import { errorHandler } from './middlewares/errorHandler.js'
import logger from './config/logger.js'
import swaggerSpec from './config/swagger.js'
import swaggerUi from 'swagger-ui-express'
import { config } from './config/env.config.js'
const app = express()
app.use(cors({ origin: config.clientUrl || '*' }))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/users',userRouter)
app.use('/api/deliveries', deliveryRouter)
app.use('/api/orders', orderRouter)
app.use('/api/stores', storeRouter)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
})
if (!config.isProd) {
  app.use('/api/mocks',mocksRouter)
  app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))
  app.get('/api/logger-test',(req,res) => {
    logger.log('debug', 'Prueba de debug')
    logger.log('http', 'Prueba de http')
    logger.log('info', 'Prueba de info')
    logger.log('warning', 'Prueba de warning')
    logger.log('error', 'Prueba de error')
    logger.log('fatal', 'Prueba de fatal')
    res.json({ status: 'success', message: 'Logs de prueba generados' })
  })
}
app.use(notFoundRoute)
app.use(errorHandler)
export default app