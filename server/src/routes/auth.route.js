import express from "express";
import {
    loginControllers,
    signupControllers,
} from "../controllers/auth.controllers.js";
import catchasync from "../handleerror/catchasync.js";

const route = express.Router();

route.post("/register", catchasync(signupControllers));
route.post("/login", catchasync(loginControllers));

export default route;
