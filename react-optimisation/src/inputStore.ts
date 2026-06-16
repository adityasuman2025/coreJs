let inputState: string = "";
const listeners = new Set<() => void>();

const inputStore = {
    get: () => {
        return inputState;
    },
    set: function (value: string) {
        inputState = value;
        listeners.forEach(cb => cb());
    },
    subscribe(cb: () => void) {
        listeners.add(cb);
        return () => listeners.delete(cb);
    }
}
export default inputStore;