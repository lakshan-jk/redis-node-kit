const redisCache = require("../redis-cache/redis-cache");
async function cacheMiddleware(req, res, next) {
  const cacheKey = req.originalUrl;
  const cachedData = await redisCache.get(cacheKey);

  if (cachedData) {
    // Data found in cache
    res.json(cachedData);
  } else {
    next();
  }
}

module.exports = cacheMiddleware;
