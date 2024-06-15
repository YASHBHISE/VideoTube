import express from "express" 
import cors from "cors"
import cookieParser from "cookie-parser"

const app =express ()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    cradentials: true
}))

// jyada json mat bhejo 

app.use(express.json({limit: "16kb"}))

// agar url se data aata hai to wo bhi lelo express

app.use(express.urlencoded({extended: true, limit: "16kb"}))

// aga kuch files and pdf aayi to usko khudke local storage me rakh lo
//assets ho public me rakho /public/temp
app.use(express.static("public"))

app.use(cookieParser())

// middeleware is use for checking some condition in between clien 
// and server, before server sending the reponse to client 
// (err, req ,response, next ) next is basically a flag, if flag active then
// it move to next middleware until goes to server at the end next is in server
// server discard the flag.



export {app}