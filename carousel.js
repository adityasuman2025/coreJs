export default function carousel(images, element) {
    //rendering images
    let tempHtml = `<div class="slider">`;
    images.forEach((item, index) => {
        tempHtml += `
            <div class="slide">
                <img src="${item.img}" alt="image_${index}" loading="lazy" />
            </div>
        `;
    });
    tempHtml += `
            <button class="btn btn-next" id="btn-next">></button>
            <button class="btn btn-prev" id="btn-prev"><</button>
        </div>
    `;
    element.innerHTML = tempHtml;

    // loop through slides and set each slides translateX
    const slides = document.querySelectorAll(".slide");
    document.getElementById("btn-next").addEventListener("click", moveNext);
    document.getElementById("btn-prev").addEventListener("click", movePrev);
        
    let currSlide = 0;
    let maxSlide = slides.length - 1;

    transFormSlide(currSlide);

    // on next click
    function moveNext() {
        if (currSlide === maxSlide) {
            currSlide = 0;
        } else {
            currSlide++;
        }

        transFormSlide(currSlide);
    }

    function movePrev() {
        if (currSlide === 0) {
            currSlide = maxSlide;
        } else {
            currSlide--;
        }

        transFormSlide(currSlide);
    }

    function transFormSlide(currSlide) {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${ (index - currSlide) * 100 }%)`;
        });
    }

    // keep slides moving automatically after 3s
    setInterval(moveNext, 3000)
}
