import { response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {User} from "../models/user.models.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser= asyncHandler( async(req,res) => {
    //get user details from frontend
    //validation- not empty
    // check if user already exist: username, email
    // check for images, check for avatar
    // upload them to cloudinary,avatar
    //create user object - create entry in db
    //remove password and refresh toke field from response
    //check for user creation
    // return res

    const {fullname, email, username,password} = req.body
    console.log("Email : " ,email);

    // if(fullname === ""){
    //     throw new ApiError(400,"fullname is requied")
    // }

    if (
        [fullname,email,username,password].some((field) => 
                field?.trim() === ""
        )
    ) {
        throw new ApiError(400,"All field is requied")
    }

    const existedUser = User.findOne({
        $or:[{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409, "user with email or user with username already exists")
    }


    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?. coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar= await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await username.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImag?.url || "",
        email,
        password,
        username: username.toLowercase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "something went wrong")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})


export {
    registerUser,
}