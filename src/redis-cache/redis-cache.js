const Redis = require('ioredis');
const redis = new Redis();

function set(key, value) {
    return redis.set(key, JSON.stringify(value));
}

function get(key) {
    return redis.get(key).then((result) => {
        return result ? JSON.parse(result) : null;
    });
}

module.exports = {
    set,
    get,
};
