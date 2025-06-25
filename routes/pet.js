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

router.get("/pets",async(req,res)=>{
    const pet = req.query.type
    if(pet.length===0){
        return res.status(400).json({error:"Pet type is required"})
    }
    try{
        const pets= await Pet.find({type:pet})
        if(pets.length === 0){
            return res.status(404).json({error:"No pets found of this type"})
        }
        return res.status(200).json(pets)
    }
    catch(err){
        console.error("Error fetching pets by type: ",err)
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

router.put("/:name",async(req,res)=>{
    const PetName=req.params.name
    const updateData=req.body
    try{
        const Update= await Pet.findOneAndUpdate({name:PetName},updateData,{new:true})
        if(!Update){
            return res.status(404).json({error:"Pet not found"})
        }
        return res.status(200).json(Update)
    }
    catch(err){
        console.error("Error Updating pet:",err)
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.delete("/:name",async(req,res)=>{
    const PetName=req.params.name
    try{
        const deletedPet=await Pet.findOneAndDelete({name:PetName})
        if(!deletedPet){
            res.status(404).json({error:"Pet not found"})
        }
        return res.status(200).json({message:"Pet deleted successfully"})
    }
    catch(err){
        console.error("Error deleting pet: ",err)
        res.status(500).json({error:"Internal Server Error"})
    }
})


module.exports=router
