// Uncaught Exception Handler
process.on("uncaughtException", (error) => {
    console.log('Shutting down the server due to uncauth exception error')
    console.log(error)
    process.exit(1)
})

import { connectMongoDb } from './src/configs/database.js'
import dotenv from 'dotenv'
dotenv.config({ path: './src/configs/config.env' })
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { corsOptions } from './src/middlewares/cors.js'
import { errorMiddleware } from './src/middlewares/errorMiddleware.js'
// Routing
import { productRoute } from './src/routes/productRoute.js'
import { userRoute } from './src/routes/userRoute.js'
import { ErrorHandler } from './src/utils/errorHandler.js'



const app = express()
app.use(express.json())
// app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))



app.use('/api/v1', productRoute)
app.use('/api/v1', userRoute)
// app.all('*', (req, res, next)=>next(new ErrorHandler('Routes not available', 404)))

app.use(errorMiddleware)



const port = process.env.PORT || 4000
const server = app.listen((port), async () => {
    await connectMongoDb()
    console.log(`server is running on port:${port}`)
})

// Unhandled promise rejection
process.on("unhandledRejection", (error) => {
    console.log('shutting down the server due to UnhandledPromise Reject')
    console.log(error)
    server.close(() => {
        process.exit(1)
    })
})

