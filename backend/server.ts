import express from "express";
import cors from 'cors';
import "express-async-errors"; //pro express retornar os errors
import errorHandler from "./src/middlewares/errorHandler";
import { userRoutes } from "./src/routes/user.routes";

const port = process.env.PORT || 3000

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is Running at ${port}`));