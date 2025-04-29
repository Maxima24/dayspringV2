const catchasync = (controllers) => {
    return async (req, res, next) => {
        controllers(req, res, next).catch((err) => {
            next(err);
        });
    };
};

export default catchasync;
