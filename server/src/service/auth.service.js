import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma.js";
import { hashPassword } from "../lib/lib.js";
import bcrypt from "bcrypt";

export const signIn = async (data, res) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists",
        });
    }
    const hashedPassword = await hashPassword(data.password);
    const user = await prisma.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: hashedPassword,
            role: data.role,
        },
    });
    
    delete user.password;

    // create a token
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
    return res.status(201).json({
        message: "User Created",
        data: user,
        token,
    });
};

export const login = async (data, res) => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!user) {
        return res.status(400).json({
            message: "Invalid Credentials",
        });
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Credentials",
        });
    }
    delete user.password;

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
    return res.status(200).json({
        message: "User logged in",
        data: user,
        token,
    });
};
