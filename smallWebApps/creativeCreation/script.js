(async function app() {
    const TOTAL_ALLOWED_CREATIVES = 5;
    
    const colors = await getColors() || [];
    

    let creatives = [];

    const colorsEle = document.getElementById("colors");
    colorsEle.append(renderColors(colors));

    function renderColors(colors) {
        const frag = document.createDocumentFragment();
        colors.forEach(color => {
            const colorEle = document.createElement("div");
            colorEle.classList.add("colorBtn");
            colorEle.dataset.type = color;
            colorEle.style.backgroundColor = color;

            frag.append(colorEle);
        });
        return frag;
    }

    function renderProgressBar(creatives) {
        const status = document.getElementById("status");
        const bar = document.getElementById("bar");

        const length = creatives.length;
        const width = length/TOTAL_ALLOWED_CREATIVES * 100;
        bar.style.width = width.toString() + "%";
        bar.style.backgroundColor = getProgressColor(width);

        status.innerText = `${length} / ${TOTAL_ALLOWED_CREATIVES} Creatives`;
    }
    
    
    //dialog stuffs
    const titleInput = document.getElementsByName("titleInput")[0];
    titleInput.addEventListener("keyup", (event) => handleInputChange(event, "title"))
    const subtitleInput = document.getElementsByName("subtitleInput")[0];
    subtitleInput.addEventListener("keyup", (event) => handleInputChange(event, "subtitle"));

    const colorInputEle = document.getElementById("colorInput");
    colorInputEle.append(renderColors(colors));
    colorInputEle.addEventListener("click", handleFormColorClick);


    const dialogEle = document.getElementById("dialog");
    const addCreativeBtn = document.getElementById("addCreativeBtn");
    addCreativeBtn.addEventListener("click", handleCreativeBtnClick);
    const closeBtnEle = document.getElementById("closeBtn");
    closeBtnEle.addEventListener("click", handleCloseDialog);

    function handleCreativeBtnClick(event) {
        event.target.classList.add("disabledBtn");
        dialogEle.classList.add("showDialog");

        titleInput.value = "";
        subtitleInput.value = "";
    }

    function handleCloseDialog() {
        addCreativeBtn.classList.remove("disabledBtn");
        dialogEle.classList.remove("showDialog");
    }

    //dialog form stuffs
    let dialogInput = {
        title: "",
        subtitle: "",
        color: "",
    }
    const createCreativeBtn = document.getElementById("createCreativeBtn");
    createCreativeBtn.addEventListener("click", handleCreateCreativeFormSubmit);


    function handleInputChange(event, type) {
        dialogInput[type] = (event.target.value).trim();

        checkShouldEnableDoneBtn()
    }

    
    function handleFormColorClick(event) {
        const color = event.target.dataset.type || "";
        dialogInput["color"] = color;

        checkShouldEnableDoneBtn()
    }

    function checkShouldEnableDoneBtn() {
        console.log("dialogInput", dialogInput)

        const values = Object.values(dialogInput);

        let goodValueCount = 0;
        values.forEach(item => { if (item) goodValueCount++ });

        console.log("values goodValueCount",values,  goodValueCount);
        if (values.length === 3 && goodValueCount === 3) {
            createCreativeBtn.classList.remove("disabledBtn");
        } else {
            createCreativeBtn.classList.add("disabledBtn");
        }
    }

    function handleCreateCreativeFormSubmit(event) {
        creatives.push(dialogInput);
        dialogInput =  {
            title: "",
            subtitle: "",
            color: "",
        };

        dialogEle.classList.remove("showDialog");
        addCreativeBtn.classList.remove("disabledBtn");
        createCreativeBtn.classList.add("disabledBtn");

        renderProgressBar(creatives);
        renderCreatives(creatives);

        console.log("creatives", creatives, dialogInput);
    }

    //creative rendering part
    function renderCreatives(creatives) {
        const creativesComp = document.getElementById("creativesComp");

        const frag = document.createDocumentFragment();
        creatives.forEach(({title, subtitle, color}) => {
            const colorEle = document.createElement("div");
            colorEle.classList.add("creative");
            colorEle.append(title);
            colorEle.append(document.createElement("br"));
            colorEle.append(subtitle);
            colorEle.style.backgroundColor = color;

            frag.append(colorEle);
        });
        
        creativesComp.innerHTML = "";
        creativesComp.append(frag);
    }

    //filteriing stuffs
    const textFilter = document.getElementById("textFilter");
    textFilter.addEventListener("keyup", handleTextFilterInput);

    function handleTextFilterInput(event) {
        const value = (event.target.value).trim().toLowerCase();
        if (value) {
            const filteredItems = creatives.filter(({ title, subtitle }) => {
                if (title.toLowerCase().includes(value) || subtitle.toLowerCase().includes(value)) return true;
            });
            console.log("filteredItems", filteredItems);
            renderCreatives(filteredItems);
        } else {
            renderCreatives(creatives);
        }
    }

    const filteredColor = [];
    colorsEle.addEventListener("click", handleColorFilter);
    function handleColorFilter(event) {
        const selectedColor = event.target.dataset.type;

        if (filteredColor.includes(selectedColor)) {
            const colorIdx = selectedColor.indexOf(selectedColor);
            filteredColor.splice(colorIdx, 1);
        } else {
            filteredColor.push(selectedColor);
        }

        if (filteredColor.length) {
            const filteredItems = creatives.filter(({ color }) => filteredColor.includes(color));
            console.log("filteredItems", filteredColor, filteredItems, selectedColor);
            renderCreatives(filteredItems);
        } else {
            renderCreatives(creatives);
        }
    }
 


    //utils
    function getProgressColor(width) {
        if (width < 25) return "red";
        else if (width < 50) return "orange";
        else if (width < 75) return "yellow";
        else return "greenyellow";
    }

    async function getColors() {
        try {
            const resp = await fetch("https://random-flat-colors.vercel.app/api/random?count=10");
            return (await resp.json()).colors;
        } catch(e) {
            console.log("api failed");
            return {};
        }
    }
})()