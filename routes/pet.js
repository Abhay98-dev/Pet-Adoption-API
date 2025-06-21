const express = require('express');
const router=express.Router()
express.urlencoded({extended:true})

const Pet=[
    {
        name:"Leo",
        type:"Dog"
    },
    {
        name:"Mittens",
        type:"Cat"
    },
    {
        name:"Goldie",
        type:"Fish"
    }
]

function findPetByName(name){
    for(const pet of Pet){
        if(pet.name.toLowerCase()===name.toLowerCase()){
            return pet
        }
    }
    if (!pet) {
        return res.status(404).json({ error: "Pet not found" });
    }
}

router.get("/",(req,res)=>{
    res.send("Pet home page")
})

router.get("/all",(req,res)=>{
    res.json(Pet)
})

router.post("/",(req,res)=>{
    const newPet=req.body
    if(!newPet.name || !newPet.type){
        res.status(400)
        res.send("Invalid Entry!!!!")
        return
    }
    Pet.push(newPet)
    res.send("data entered succesfully")
})

router.get("/:name",(req,res)=>{
    const petName=req.params.name
    const pet=findPetByName(petName)
    res.json(pet)
})
module.exports=router
