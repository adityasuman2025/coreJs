export default function createRateLimitter(maxTokens = 5, refillInterval = 1000) {
    const bucket = new Map();

    setInterval(() => {
        const now = Date.now();
        const keys = Array.from(bucket.keys());
        for (let i = 0; i < keys.length; i++) {
            const thisIp = keys[i];
            const thisIpBucket = bucket.get(thisIp);

            // removing ip from bucket if it was filled 1 minutes ago (i.e. no new request has been made from that ip in last 1 minute)
            if (thisIpBucket.lastRefillTime < now - 60000) bucket.delete(thisIp);
        }
    }, 10 * 60 * 1000); // doing this cleanup every 10 minutes, so keep prevent bucket consume unlimited memory

    return function rateLimitter(req, res, next) {
        const ip = req.ip;
        const now = Date.now();

        if (!bucket.has(ip)) bucket.set(ip, {
            lastRefillTime: now,
            freeTokens: maxTokens
        });

        const thisIpBucket = bucket.get(ip);

        const timeElapsed = now - thisIpBucket.lastRefillTime;
        const tokensToRefill = Math.floor(timeElapsed / refillInterval);

        if (tokensToRefill > 0) {
            thisIpBucket.freeTokens = Math.min(maxTokens, thisIpBucket.freeTokens + tokensToRefill);
            thisIpBucket.lastRefillTime = now;
        }

        if (thisIpBucket.freeTokens < 1) return false;
        else {
            thisIpBucket.freeTokens--;
            return true;
        }
    }
}