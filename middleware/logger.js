function logger(req, res, next) {
    const start = Date.now();
    const timestamp = new Date().toISOString();
    const method = req.method;
    const route = req.originalUrl;
    const ip = req.ip;

    res.on('finish', () => { 
        const duration = Date.now() - start;
        console.log(`[${timestamp}] ${method} ${route} - From: ${ip} - Status: ${res.statusCode} - ${duration}ms`);
    });

    next();
}

module.exports = logger;