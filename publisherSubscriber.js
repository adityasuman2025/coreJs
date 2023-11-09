class Publisher {
    constructor() {
        this.subscribers = {};
    }

    subsribe(topic, callback) {
        if (!this.subscribers.hasOwnProperty(topic)) this.subscribers[topic] = [];

        this.subscribers[topic].push(callback);

        return {
            unsubscribe: () => {
                this.subscribers = {
                    ...this.subscribers,
                    [topic]: this.subscribers[topic].filter(cb => cb !== callback)
                }
            }
        }
    }

    publish(topic, ...args) {
        (this.subscribers[topic] || []).forEach(cb => {
            cb(...args);
        })
    }
}

const myPublisher = new Publisher();

const topic1 = "topic1", topic2 = "topic2";

const subscriber1 = myPublisher.subsribe(topic1, function(...args) {
    console.log("subscriber1 receives:", ...args);
});

const subscriber2 = myPublisher.subsribe(topic1, function(...args) {
    console.log("subscriber2 receives:", ...args);
});

const subscriber3 = myPublisher.subsribe(topic2, function(...args) {
    console.log("subscriber3 receives:", ...args);
});

console.log("\n")
myPublisher.publish(topic1, "1 data arrives");

subscriber1.unsubscribe();

console.log("\n")
myPublisher.publish(topic2, "2 data arrives");