import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.router.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/users',userRouter)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
})
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
})
export default app