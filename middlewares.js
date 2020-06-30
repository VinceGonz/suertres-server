const jwt = require('jsonwebtoken');

// * Route not found handler
const notFound = (req, res, next) => {
    // * If route entered was not found 
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    // * Send the error to the next middleware which is the error handler to process it.
    next(error);
}

// * ERROR Handler
const errorHandler = (error, req, res, next) => {
    // * If the current status code passed is != 200 then use the current statusCode else set statusCode to 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🎂': error.stack,
    })
}


//* Verify Token middleware

const verifyToken = (req, res, next) => {
    //* Access the token passed on the req.header
    const token = req.header('auth-token');

    //* If token is not set, user is unauthorized.
    if(!token) return res.status(401).json({Message: `Forbidden Access: Invalid Token`});

    try{
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = userVerified;
    }catch(err){
        res.status(401).json({Message: "Forbidden Access: Invalid Token"})
    }

    next();
}



module.exports = {
    notFound,
    errorHandler,
    verifyToken,
}