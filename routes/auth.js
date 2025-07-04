const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
require("dotenv").config();
const jwt = require("jsonwebtoken");

const User=require("../models/user")

const saltRounds=10

router.use(express.urlencoded({extended:true}))

router.get("/",(req,res)=>{
    res.send("Welcome to the Pet Adoption API")
})

router.post("/register",async(req,res)=>{
    const {username,email,password}=req.body
    if(!username || !email || !password){
        return res.status(400).json({error:"All Fields are required"})
    }
    try{
        const existingUser = await User.findOne({ email})
        if(existingUser){
            return res.status(400).json({error:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,saltRounds)

        const newUser= new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()
        res.status(200).json({message:"User registered successfully",user:newUser})
    }
    catch(err){
        console.error("Error registering user: ",err)
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.post("/login",async(req,res)=>{
    const{ email, password}=req.body
    if(!email|| !password){
        return res.status(400).json({error:"credentials are required"})
    }
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({error:"Invalid password"})
        }
        const token = jwt.sign({ userId: user._id, email:user.email}, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({message:"login Successful",token: token})
    }
    catch(err){
        console.error("Error logging in user: ",err)
        res.status(500).json({error:"Internal Server Error"})
    }
})

module.exports=router
