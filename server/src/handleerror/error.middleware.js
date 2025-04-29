export const catchError = (error, req, res, next) => {
    console.log(error);
    res.status(400).json({ message: "Bad request" });
};
