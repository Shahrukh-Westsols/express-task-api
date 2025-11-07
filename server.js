const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');
const taskRoutes = require('./routes/taskRoutes');

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.get('/health', (req, res) =>{
    res.status(200).json({success: true, status: "ok",timestamp: new Date().toISOString()}
)
});

app.use('/api/tasks', taskRoutes);
app.use(errorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Server is listening on http://localhost:${PORT}`);
})