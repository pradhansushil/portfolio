const heroElement = document.querySelector(".hero-tagline");
const textToAnimate = heroElement.textContent;
const delay = 300;

heroElement.textContent = "";

for (let i = 0; i < textToAnimate.length; i++) {
  setTimeout(() => {
    heroElement.textContent = textToAnimate.slice(0, i + 1);
  }, delay * i);
}
