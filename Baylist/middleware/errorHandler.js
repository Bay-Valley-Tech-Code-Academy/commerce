// errorHandler.js
// references the middleware.js with the includes substring as a comparison to throw a custom error msg
// also includes http status codes 

export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message); // Log the error for debugging

    let statusCode = 500;
    let errorMessage = 'Internal Server Error';

    // Specific error handling based on error messages
    if (err.message.includes('not found')) {
        statusCode = 404;
        errorMessage = err.message;
    } else if (err.message.includes('No fields provided for update')) {
        statusCode = 400; // Bad Request
        errorMessage = err.message;
    } else if (err.message.includes('Validation failed: invalid id')) {
        statusCode = 400;
        errorMessage = 'Invalid ID provided';
    }

    res.status(statusCode).json({ error: errorMessage });
};

export default errorHandler;
