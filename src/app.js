import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.router.js'
import mocksRouter from './routes/mocks.router.js'
import deliveryRouter from './routes/delivery.router.js'
import orderRouter from './routes/order.router.js'
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
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
})
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({ status: 'error', message: messages })
  }
  const statusCode = err.statusCode || 500
  const message = err.statusCode ? err.message : 'Error interno del servidor'
  res.status(statusCode).json({ status: 'error', message })
})
export default app