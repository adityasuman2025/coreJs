let barCounter = 1;
let counter = 0;

startProgress();
function startProgress() {
  const bar = document.getElementById("bar" + barCounter);
  let interval = setInterval(() => {
    if (counter == -1 && barCounter < 10) {
      clearInterval(interval);
      createProgressBar();
    }

    let width = (10 * counter) % 100;
    if (parseInt((10 * counter) / 100)) {
      width = 100;
      counter = -2;
    }
    console.log("width", width);
    bar.style.width = width.toString() + "%";
    bar.style.backgroundColor = getColor(width);
    counter++;
  }, 500);
}

function createProgressBar() {
  const progressEle = document.createElement("div");
  progressEle.classList.add("progress");

  const barEle = document.createElement("div");
  barEle.classList.add("bar");
  barEle.id = "bar" + ++barCounter;
  progressEle.appendChild(barEle);

  document.getElementById("app").appendChild(progressEle);
  startProgress();
}

function getColor(width) {
  if (width < 25) return "red";
  else if (width < 50) return "orange";
  else if (width < 75) return "yellow";
  else return "greenyellow";
}