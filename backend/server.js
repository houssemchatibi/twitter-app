import express from "express"
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";

import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app =express();
const PORT = process.env.PORT || 5000;

app.get("/",(req,res) =>{
    res.send("Server is ready!");
})

app.use(cookieParser());
app.use(express.json({ limit: "5mb" })); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectMongoDB();
});