console.log("contact.js loaded");

const contact = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const formWrapper = document.getElementById("formWrapper");

function handleSubmit(event) {
  console.log("handlesubmit fired.");
  event.preventDefault();
  const contactName = document.getElementById("name").value;
  const contactEmail = document.getElementById("email").value;
  const contactMessage = document.getElementById("message").value;

  if (
    contactName.trim() === "" ||
    contactEmail.trim() === "" ||
    contactMessage.trim() === ""
  ) {
    formMessage.textContent = "All fields are required to be filled";
    return;
  }

  fetch(contact.getAttribute("action"), {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: new FormData(contact),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.ok) {
        formWrapper.innerHTML =
          "<h3>Email sent successfully!</h3><p>I've received your message and will get back to you as soon as possible.</p>";
      } else {
        formMessage.textContent = "Something went wrong, please try again.";
      }
    });
}

contact.addEventListener("submit", handleSubmit);
