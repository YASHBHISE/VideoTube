

//require('dotenv').config({path: './env})
import dotenv from "dotenv"

// import mongoose from "mongoose";
import { app } from "./app.js";
// import {DB_NAME} from "./constants"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})


connectDB()
.then(() => {
    app.on("error", (error) =>{
        console.log("ERROR",error)
        throw err
    })
    app.listen(process.env.PORT || 80000, () =>{

        console.log(`server is running at port  : ${process.env.PORT}`);
    })
       
})
.catch((err) => {
    console.log("MONGO db connection failed !!!",err)
})


























/*
import express from "express"

 (async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) =>{
            console.log("ERROR",error)
            throw
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    } catch(error){
        console.log("ERROR",error)
        throw err
    }
 })()*/