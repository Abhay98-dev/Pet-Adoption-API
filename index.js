const express=require("express")
const app=express()
const PORT=3000
const mongoose=require("mongoose")
require("dotenv").config()
const Petrouter=require("./routes/pet")
const Authrouter=require("./routes/auth")

async function main(){
    await mongoose.connect(process.env.Mongo_url)
}

main()
    .then(()=>{
        console.log("Connected to MongoDb")
    })
    .catch((err)=>{
        console.error("Error connecting to MongoDB: ",err)
    })



app.use(express.json())

app.use("/pet",Petrouter)
app.use("/auth",Authrouter)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})