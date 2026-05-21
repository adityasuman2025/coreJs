class EventEmitter {
    constructor() {
        this.events = {};
    }

    subscribe(eventName, callback) {
        this.events[eventName] = [...(this.events[eventName] || []), callback];

        return {
            release: () => this.events[eventName] = this.events[eventName].filter(cb => cb != callback) // releasing / removing that subscriber
        }
    }

    emit(eventName, ...args) {
        if (this.events.hasOwnProperty(eventName)) {
            this.events[eventName].forEach(func => func(...args));
        }
    }
}

const emitter = new EventEmitter();
const EVENT1 = "event1"

const sub1 = emitter.subscribe(EVENT1, function() {
    console.log("subs 1");
});
const sub1_2 = emitter.subscribe(EVENT1, function(...args) {
    console.log("subs 2", ...args);
});

// sub1.release();
emitter.emit(EVENT1, "mast hai");
emitter.emit(EVENT1, "kya baat hai");