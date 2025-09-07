const asyncHandler = require('express-async-handler');
const User=require("../model/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
//@desc Register a new user
//@route POST /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("ALl fields are mandatory!");
    }
    //check if user already exits
    const userAvailiable = await User.findOne({email});
    if(userAvailiable){
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({username,email,password:hashedPassword});
    if(!user){
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.status(201).json({ _id:user._id,email:user.email });
})


//@desc Login a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler (async (req, res) => {
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("ALl fields are mandatory!");
    } 
    //check if user already exits
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user._id
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"120m"})
        res.status(200).json({ accessToken, user: { username: user.username} });
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }
})

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler (async (req, res) => {
    res.status(200).json({ message: 'User profile data' });
})

module.exports = { registerUser, loginUser, getUserProfile };
