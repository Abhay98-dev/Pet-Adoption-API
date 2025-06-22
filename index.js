const express=require("express")
const app=express()
const PORT=3000
const mongoose=require("mongoose")
require("dotenv").config()

async function main(){
    await mongoose.connect(process.env.Mongo_url)
}

main()
    .then(()=>{
        console.log("COnnected to MongoDb")
    })
    .catch((err)=>{
        console.error("Error connecting to MongoDB: ",err)
    })


const router=require("./routes/pet")

app.use(express.json())

app.use("/pet",router)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})