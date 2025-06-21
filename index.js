const express=require("express")
const app=express()
const PORT=3000

const router=require("./routes/pet")

app.use(express.json())

app.use("/pet",router)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})