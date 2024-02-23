import  Express  from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"
import { config } from 'dotenv'
import categoriaRoutes from '../src/categoria/categoria.routes.js'
import productoRoutes from '../src/Productos/producto.routes.js'
import userRoutes from '../src/User/user.routes.js'

const app = Express()
config()
const port = process.env.PORT  || 2656

app.use(Express.urlencoded({extended: false}))
app.use(Express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/categoria',categoriaRoutes)
app.use('/producto',productoRoutes)
app.use('/user',userRoutes)
export const initServer = ()=>{
    app.listen(port)
    console.log(`HTTP esta en el puerto ${port}`)
}