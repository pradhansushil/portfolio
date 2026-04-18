function animatedLetters() {
  const heroElement = document.querySelector(".hero-tagline");

  if (!heroElement) return;

  const textToAnimate = heroElement.textContent;

  function typeEffect(index) {
    // 1. THE EXIT/RESET: If index reaches the end...
    if (index === textToAnimate.length) {
      setTimeout(() => {
        heroElement.textContent = "";
        typeEffect(0);
      }, 3000);
      return;
    }

    // 2. THE TEXT UPDATE:
    heroElement.textContent = textToAnimate.slice(0, index + 1);

    // 3. THE LOGIC: Determine the delay
    let delay = 300;

    // check if the current character is a period
    if (textToAnimate[index] === ".") {
      delay += 150;
    }

    // 4. THE RECURSION: Schedule the next character
    setTimeout(() => {
      typeEffect(index + 1);
    }, delay);
  }
  // Initial call to start the engine
  typeEffect(0);
}

animatedLetters();
