const express = require('express');
const router=express.Router()
express.urlencoded({extended:true})
const mongoose=require("mongoose")
const Pet=require("../models/Pet")

//create a new pet
router.post("/",async(req,res)=>{
    pet=req.body
    try{
        const newPet=await Pet.create(pet)
        res.status(201).json(newPet)
    }
    catch(err){
        console.error("Error creating pet: ",err)
        res.status(500).json({error:"Internal Server Error"})
    }
})

//get all pets
router.get("/",async(req,res)=>{
    try{
        const pets=await Pet.find()
        res.status(200).json(pets)
    }
    catch(err){
        console.log("Error fetching pets: ",err)
        res.status(500).json({error:"Internal Server Error"})
    }
})

//get a pet by name
router.get("/:name",async(req,res)=>{
    const PetName=req.params.name
    try{
        const pet=await Pet.findOne({name:PetName})
        if(!pet){
            return res.status(404).json({error:"Pet not found"})
        }
        return res.status(200).json(pet)
    }
    catch(err){
        console.error("Error fetching pet: ",err)
        res.status(500).json({error:"Internal Server Error"})
    }
})
module.exports=router
