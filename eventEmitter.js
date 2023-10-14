class EventEmitter {
    constructor() {
        this.events = {};
    }

    subscribe(eventName, callback) {
        this.events[eventName] = [...(this.events[eventName] || []), callback];

        return {
            release: () => {
                const idxOfCallback = this.events[eventName].indexOf(callback);
                this.events[eventName].splice(idxOfCallback, 1);
            }
        };
    }

    emit(eventName, ...args) {
        if (this.events.hasOwnProperty(eventName)) {
            this.events[eventName].forEach(func =>
                func(...args)
            );
        }
    }
}

const emitter = new EventEmitter();

function callback1(...args) {
    console.log("callback 1", ...args);
}
function callback2(...args) {
    console.log("callback 2", ...args);
}
function callback3(...args) {
    console.log("callback 3", ...args);
}

const sub1 = emitter.subscribe('event1', callback1);
const sub1_2 = emitter.subscribe('event1', callback1); // same callback could subscribe on same event multiple times

const sub2 = emitter.subscribe('event2', callback2);
const sub2_2 = emitter.subscribe('event2', callback3); // same events can be subsribed with multiple callbacks

// emitter.emit('event1', 1, 2); // callback1 will be called twice
// emitter.emit('event2', 2, 3); // both callback2 & callback3 will be called

sub1.release();
emitter.emit('event1', 1, 2); // callback1 of sub1 is no more, so callback1 of only sub1_2 will get called

sub2.release();
emitter.emit('event2', 2, 3); // callback2 of sub2 is no more, so only left callback3 for event, event2 will only get called