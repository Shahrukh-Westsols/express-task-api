

function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    // const url = req.url;
    const route = req.originalUrl;
    const ip = req.ip;  
    console.log(`[${timestamp}] ${method} ${route} - From: ${ip}`);
    next();
};

module.exports = logger;