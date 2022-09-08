const starsWrapper = document.getElementById("stars");
const stars = document.querySelectorAll(".star");
const rating = document.getElementById("rating");
starsWrapper.addEventListener("click", handleStarsClick);

function handleStarsClick(event) {
  const { value } = event.target.dataset || {};
  console.log("value", value)
  if (value) {
    rating.innerText = "You have rated " + value;

    for (let i=0; i < stars.length; i++) {
      let star = stars[i];
      if (i >= stars.length-value) {
        star.classList.add("filledStar");
        console.log("add star", star)
      } else {
        star.classList.remove("filledStar");
        console.log("remove star", star)
      } 
    }
  }
}
