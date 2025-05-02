import { ZodError } from "zod";

export const catchError = (error, req, res, next) => {
    console.log(error);
    if (error instanceof SyntaxError) {
        return res.status(400).json({ message: "invalid JSON Format" });
    }
    if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors });
    }
    res.status(400).json({ message: "Bad request" });
};
