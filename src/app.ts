import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

AppDataSource.initialize().then(() => {
  console.log("Database connection established");
}).catch((error) => {
  console.error("Error connecting to the database", error);
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Timekeeper Backend funcionando!");
});

export default app;