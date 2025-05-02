import express from "express";
import {
    loginControllers,
    signupControllers,
} from "../controllers/auth.controllers.js";
import catchasync from "../handleerror/catchasync.js";
import { getAllProducts } from "../controllers/products.controllers.js";

const route = express.Router();

// Authentication routes
route.post("/register", catchasync(signupControllers));
route.post("/login", catchasync(loginControllers));



export default route;
