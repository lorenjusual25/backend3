import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.router.js'
import mocksRouter from './routes/mocks.router.js'
import deliveryRouter from './routes/delivery.router.js'
import orderRouter from './routes/order.router.js'
import { notFoundRoute } from './middlewares/notFoundRoute.js'
import { errorHandler } from './middlewares/errorHandler.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/users',userRouter)
app.use('/api/mocks',mocksRouter)
app.use('/api/deliveries', deliveryRouter)
app.use('/api/orders', orderRouter)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
})
app.use(notFoundRoute)
app.use(errorHandler)
export default app