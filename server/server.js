import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import path from 'path'

import userRouter from './routes/user-route.js'
import notesRouter from './routes/notes-router.js'
import { ErrorHandler } from './middleware/errorHandler.js'

const app = express()
dotenv.config()
connectDB()

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
    credentials: true,
  })
);
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, 'client/dist')))
    
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Server is'))
}


app.use('/api/user', userRouter)
app.use('/api/notes', notesRouter)
app.use(ErrorHandler)


app.listen(process.env.PORT || 8000, () => {
    console.log("SERVER STARTS AT http://localhost:",process.env.PORT)
    console.log("NODE_ENV:", process.env.NODE_ENV)
})