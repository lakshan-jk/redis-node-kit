const express = require("express");
const fetchDataFromDatabase = require("../redis-cache/database-service");
const redisCache = require("../redis-cache/redis-cache.js");
const router = express.Router();

// Define a route to get data by ID
router.get("/api/data/:id", async (req, res) => {
  const cacheKey = req.originalUrl;

  // Try to get data from Redis cache
  const cachedData = await redisCache.get(cacheKey);
  if (cachedData) {
    res.json(cachedData);
  } else {
    // Data not in cache, fetch from the database
    const data = await fetchDataFromDatabase(req.params.id);
    // Store data in Redis cache for future use
    await redisCache.set(cacheKey, data);
    res.json(data);
  }
});

module.exports = router;
