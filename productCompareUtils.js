// utils
function getSearchBoxHtml(inputDefaultValue, suggData, onSuggItemClick) {
    const searchBox = document.createElement("div");
    searchBox.classList.add("searchBox");
    const suggWrapper = document.createElement("ul");
    suggWrapper.classList.add("suggWrapper");
    suggWrapper.style.display = "none";
    suggWrapper.addEventListener("click", handleSuggClick);

    const inputField = document.createElement("input");
    inputField.addEventListener("keyup", debounce(handleTyping, 500));
    inputField.value = inputDefaultValue;

    function handleTyping(event) {
        resetSugg();

        const value = (event.target.value).trim().toLowerCase();
        if (value) {
            suggWrapper.style.display = "block"; //showing suggestion wrapper
            const suggestions = suggData.filter(item => item.name.toLowerCase().includes(value));
            renderSuggestion(suggestions);
        }
    }

    function renderSuggestion(suggestions) {
        const suggFram = document.createDocumentFragment();
        suggestions.forEach(sugg => {
            const suggEle = document.createElement("li");
            suggEle.innerText = sugg.name;
            suggEle.dataset.key = sugg.id;
            suggFram.append(suggEle);
        });

        suggWrapper.append(suggFram)
    }

    function handleSuggClick(event) {
        const key = event.target.dataset.key;
        if (key) {
            inputField.value = event.target.innerText;
            resetSugg();
            onSuggItemClick(key);
        }
    }

    function resetSugg() {
        suggWrapper.innerHTML = ""; //removing old suggestion
        suggWrapper.style.display = "none"; //hiding suggestion wrapper
    }

    searchBox.append(inputField);
    searchBox.append(suggWrapper);

    return searchBox;
}

function debounce(func, delay) {
    let timer;

    return function (args) {
        clearTimeout(timer);
        timer = setTimeout(() => { func.call(this, args) }, delay);
    }
}

export { getSearchBoxHtml, debounce };