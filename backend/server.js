import express from "express"
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";


dotenv.config();
const app =express();
const PORT = process.env.PORT || 5000;
console.log("the port",process.env.PORT)

app.get("/",(req,res) =>{
    res.send("Server is ready!");
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectMongoDB();
});