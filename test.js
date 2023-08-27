const imgs = [{
    img: "https://source.unsplash.com/random?landscape,mountain",
    title: "mountain"
}, {
    img: "https://source.unsplash.com/random?landscape,cars",
    title: "cars"
}, {
    img: "https://source.unsplash.com/random?landscape,night",
    title: "night"
}, {
    img: "https://source.unsplash.com/random?landscape,city",
    title: "city"
}];
const slidesLength = imgs.length, width = 1000;
let active = 1;

const carouselEle = document.getElementById("carousel");
const carouselContainerEle = document.getElementById("content");
carouselContainerEle.addEventListener("click", handleDrctnBtnClick);

function handleDrctnBtnClick({ target } = {}) {
    const { type } = target.dataset || {};

    if (type === "left") movePrev();
    else if (type === "right") moveNext();
}

function renderImages(imgs) {
    const imagesEle = document.createElement("div");
    imgs.forEach(({ img }, idx) => {
        const imageEle = document.createElement("img");
        imageEle.style.left = idx * width + "px";
        imageEle.alt = "image_" + idx;
        imageEle.loading = "lazy";
        imageEle.src = img;

        imagesEle.appendChild(imageEle);
    });

    carouselEle.innerHTML = imagesEle.innerHTML;
}
renderImages(imgs);

function moveNext() {
    active = active === slidesLength ? 1 : active + 1;
    moveSlide();
}

function movePrev() {
    active = active === 1 ? slidesLength : active - 1;
    moveSlide();
}

function moveSlide() {
    const nodes = carouselEle.childNodes || [];
    nodes.forEach((imageEle, idx) => {
        imageEle.style.left = ((active - (idx + 1)) * width) + "px"; // goal is to make active idx's style.left = 0
    })
}

let interval = setInterval(moveNext, 2000);
carouselContainerEle.addEventListener("mouseover", function () {
    clearInterval(interval);
});
carouselContainerEle.addEventListener("mouseleave", function () {
    interval = setInterval(moveNext, 2000);
});