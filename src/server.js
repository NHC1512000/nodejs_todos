import express from "express";
import configViewEngine from "./configs/viewEngine";
import initApiRoute from "./route/api";
import connectDB from "./configs/connectDB";
import cors from 'cors';
require("dotenv").config();
let  app = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initApiRoute(app);

connectDB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
