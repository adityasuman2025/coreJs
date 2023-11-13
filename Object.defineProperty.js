// model function will bind input object to state obj, 
// whenever any change happens in `value` key of state obj then that change will get applied to `value` key of input obj too
const state = { value: 'BFE' };
const input = {};

function model(state, element) {
    element.value = state.value;

    const descriptor = {
        set(value) {
            element.value = value;
        },
        get() {
            return element.value;
        }
    }
    Object.defineProperty(state, "value", descriptor);
}

model(state, input);

console.log(input.value) // 'BFE'
state.value = 'dev'
console.log(input.value) // 'dev'
input.value = 'BFE.dev'
console.log(state.value) // 'BFE.dev'