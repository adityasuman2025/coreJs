// ref: https://bigfrontend.dev/problem/create-a-browser-history

class BrowserHistory {
    /**
     * @param {string} url
     * if url is set, it means new tab with url
     * otherwise, it is empty new tab
     */
    constructor(url) {
        this.state = [];
        this.stateIdx = -1;
        this.givenUrl = false;

        if (url) {
            this.state.push(url);
            this.stateIdx = 0;
            this.givenUrl = true;
        }
    }

    /**
     * @param { string } url
     */
    visit(url) {
        this.state = [...this.state.slice(0, this.stateIdx + 1), url]; // truncate all states after the stateIdx and push the coming url

        this.stateIdx = this.state.length - 1;
        console.log(this);
    }

    /**
     * @return {string} current url
     */
    get current() {
        return this.state[this.stateIdx];
    }

    // go to previous entry
    goBack() {
        if ((this.stateIdx === 0) && this.givenUrl) return; // if BrowserHistory is created with a given url i.e.  BrowserHistory(url), then we cannot remove/go back to the given url

        this.stateIdx = this.stateIdx - 1;
        return this.state[this.stateIdx];
    }

    // go to next visited url
    forward() {
        if (this.stateIdx === this.state.length - 1) return; // we cannot go forward if we don't have more elements or this.stateIdx is at the last element

        this.stateIdx = this.stateIdx + 1;
        return this.state[this.stateIdx];
    }
}

const bh = new BrowserHistory('X')
bh.visit('A')
bh.goBack()
bh.goBack()
console.log(bh.current); //.toBe('X')

// const bh = new BrowserHistory()
// bh.visit('A')
// bh.visit('B')
// bh.goBack()
// console.log(bh.current); //.toBe('A')

// const bh = new BrowserHistory('A')
// console.log(bh.current); //.toBe('A')
