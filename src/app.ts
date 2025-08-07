import express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { router } from "./app/routes";
import httpStatus from "http-status-codes"
import { globalErrHandler } from "./app/middlewares/globalErrHandlers";
import passport from "passport";
import "./app/config/passport"
import expressSession from "express-session"
const app = express()

// why is it use
app.use(expressSession({
  secret:"your secret",
  resave:false,
  saveUninitialized:false
  
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.json())
// for smoothly working with form data
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/v1', router)



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(globalErrHandler)

app.use((req:Request, res:Response)=>{
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message:"Page not fount"
  })
})




export default app;