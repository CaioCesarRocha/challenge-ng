import express from "express";
import cors from 'cors';
import "express-async-errors"; //pro express retornar os errors

const port = process.env.port || 3000

const app = express();

app.use(cors());
app.use(express.json());


app.listen(port, () => console.log(`Server is Running at ${port}`));