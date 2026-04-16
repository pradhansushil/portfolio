const year = document.getElementById("year");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
year.textContent = currentYear;

const footerElement = document.getElementById("footer");
const githubLink = document.createElement("a");
githubLink.href = "https://github.com/pradhansushil/";
githubLink.target = "_blank";
githubLink.textContent = "GitHub";
githubLink.classList.add("footer-link");
footerElement.appendChild(githubLink);
