const express = require('express');
const cacheMiddleware = require('./middleware/cache-middleware');
const dataController = require('./controller/redis-cache-controller');x
const app = express();

// Apply the global caching middleware to all APIs
app.use(cacheMiddleware);

app.use(dataController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
