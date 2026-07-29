/*
    Implement a zero-dependency Node.js class named HybridRateLimiter.
    
    class HybridRateLimiter {
        constructor(globalLimit, perClientLimit, windowMs) {}
    
        allow(clientId, timestampMs) {}
    }
    
    Rules:
    
    1. Sliding window only.
    2. Fixed-window refill is NOT allowed.
    3. A request is allowed only if:
       a) client has not exceeded perClientLimit
       b) system has not exceeded globalLimit
    4. Time complexity should be O(1) amortized.
    5. Expired requests must not cause unbounded memory growth.
    
    TEST
    
    const rl = new HybridRateLimiter(
        5,  // global
        3,  // per client
        1000
    );
    
    const result = [
        rl.allow("A", 0),     // T
        rl.allow("A", 100),   // T
        rl.allow("A", 200),   // T
        rl.allow("A", 300),   // F
    
        rl.allow("B", 400),   // T
        rl.allow("B", 500),   // T
    
        rl.allow("C", 600),   // F (global hit)
    
        rl.allow("A", 1001),  // T
        rl.allow("C", 1100),  // T
    ];
    
    console.log(result);
*/

class HybridRateLimiter {
    constructor(globalLimit, perClientLimit, windowMs) {
        this.globalLimit = globalLimit;
        this.perClientLimit = perClientLimit;
        this.ttl = windowMs;

        this.globalCount = 0;
        this.bucket = new Map();
    }

    allow(clientId, timestampMs) {
        if (!this.bucket.has(clientId)) {
            this.bucket.set(clientId, new Set());
        }

        const keys = Array.from(this.bucket.keys());
        for (let i = 0; i < keys.length; i++) {
            const clientBucket = this.bucket.get(keys[i]);
            while (clientBucket.size > 0) {
                const item = clientBucket.values().next().value;
                if (timestampMs >= item + this.ttl) {
                    clientBucket.delete(item);
                    this.globalCount--;
                } else break;
            }
        }

        const currClientBucket = this.bucket.get(clientId);
        if (currClientBucket.size >= this.perClientLimit || this.globalCount >= this.globalLimit) {
            return false;
        } else {
            this.globalCount++;
            currClientBucket.add(timestampMs);

            return true;
        }
    }
}

const rl = new HybridRateLimiter(
    5,  // global
    3,  // per client
    1000
);

const result = [
    rl.allow("A", 0),     // T
    rl.allow("A", 100),   // T
    rl.allow("A", 200),   // T
    rl.allow("A", 300),   // F

    rl.allow("B", 400),   // T
    rl.allow("B", 500),   // T

    rl.allow("C", 600),   // F (global hit)

    rl.allow("A", 1001),  // T
    rl.allow("C", 1100),  // T
];

console.log(result);