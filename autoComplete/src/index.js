import { FRUITS } from "./data.js";

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", debounce(handleTyping, 1000));

const suggestionsWrapper = document.getElementById("suggestionsWrapper");
suggestionsWrapper.addEventListener("click", handleSelectItem);

function handleSelectItem(event) {
  const { key } = event.target.dataset || {};
  if (key) {
    searchInput.value = key;
    resetSuggestions();
  }
}

function getSuggestions(keyword) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(
        FRUITS.filter((item) =>
          item.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }, 100);
  });
}

async function handleTyping(event) {
  resetSuggestions();

  const text = event.target.value.trim();
  if (text) {
    const resp = await getSuggestions(text);
    if (resp.length) {
      suggestionsWrapper.classList.add("visible");
      renderSuggestions(resp);
    }
  }
}

function renderSuggestions(list) {
  let suggestionItems = document.createDocumentFragment();
  list.forEach((item) => {
    const divEle = document.createElement("div");
    divEle.classList.add("suggestionItem");
    divEle.innerText = item;
    divEle.setAttribute("data-key", item);
    suggestionItems.appendChild(divEle);
  });

  suggestionsWrapper.appendChild(suggestionItems);
}

function resetSuggestions() {
  suggestionsWrapper.classList.remove("visible");
  suggestionsWrapper.innerText = "";
}

function debounce(func, delay = 500) {
  let timer;

  return function () {
    const self = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(self, args), delay);
  };
}

function throttle(func, delay) {
  let flag = true;
  return function () {
    const self = this,
      args = arguments;
    if (flag) {
      func.apply(this, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
}
