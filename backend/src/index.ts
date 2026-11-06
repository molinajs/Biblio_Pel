import express from 'express'
import cors from 'cors'
import { router } from './routes/router';


const app = express();
const port = 3333
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000'
}))


app.use('/', router)

app.listen(port, () => {
    console.log(`API rodando no endereço: http://localhost:${port}`)
  })