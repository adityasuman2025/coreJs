/*
https://bigfrontend.dev/problem/event-delegation

Can you create a function which works like jQuery.on(), that attaches event listeners to selected elements.

In jQuery, selector is used to target the elements, in this problem, it is changed to a predicate function.

onClick(
  // root element
  document.body,  
  // predicate
  (el) => el.tagName.toLowerCase() === 'div',  
  function(e) {
    console.log(this);
    // this logs all the `div` element
  }
)
event.stopPropagation() and event.stopImmediatePropagation() should also be supported.

you should only attach one real event listener to the root element.
*/

/**
 * @param {HTMLElement} root
 * @param {(el: HTMLElement) => boolean} predicate
 * @param {(e: Event) => void} handler
 */
function onClick(root, predicate, handler) {
    let element = null;
    function dfs(node) {
        if (element) return;

        if (!node) return;

        if (predicate(node)) {
            element = node;
            return;
        }

        for (let i = 0; i < node.children.length; i++) {
            if (!element) dfs(node.children[i]);
        }
    }
    dfs(root);

    if (element) element.addEventListener("click", handler);
}


const root = document.createElement('div')
root.innerHTML = `
  <div id="div1">
    <div id="div2">
      <div id="div3">
        div
      </div>
    </div>
  </div>
`
const div1 = root.querySelector('#div1')
const div2 = root.querySelector('#div2')
const div3 = root.querySelector('#div3')

const logs = []
onClick(root, (el) => el.id === 'div1', function(e) {
    logs.push(this.id)
})
onClick(root, (el) => el.id === 'div2', function(e) {
    logs.push(this.id)
})
onClick(root, (el) => el.id === 'div3', function(e) {
    logs.push(this.id)
})
onClick(root, (el) => el.id === 'div3', function(e) {
    logs.push(this.id)
})
div3.click()

setTimeout(() => {
    console.log(logs); // .toEqual(['div3', 'div3', 'div2', 'div1'])
}, 100)
