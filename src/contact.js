const contact = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const contactSection = document.getElementById("contact-form");
const contactName = document.getElementById("name");
const contactEmail = document.getElementById("email");
const contactMessage = document.getElementById("message");

function modifyClass(className, action, ...elements) {
  elements.forEach((element) => {
    if (action === "add") {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  });
}

function clearErrors() {
  modifyClass("error", "remove", formMessage);
  modifyClass(
    "input-error",
    "remove",
    contactName,
    contactEmail,
    contactMessage
  );
}

function handleErrors() {
  let hasError = false;

  if (contactName.value.trim() === "") {
    hasError = true;
    modifyClass("input-error", "add", contactName);
  }
  if (contactEmail.value.trim() === "") {
    hasError = true;
    modifyClass("input-error", "add", contactEmail);
  }
  if (contactMessage.value.trim() === "") {
    hasError = true;
    modifyClass("input-error", "add", contactMessage);
  }

  if (hasError) {
    formMessage.textContent = "All fields are required to be filled";
    modifyClass("error", "add", formMessage);
    return hasError;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  formMessage.textContent = "";
  clearErrors();
  if (handleErrors()) return;

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
        contactSection.innerHTML = `
          <div class="success-container">
            <h3>Email sent successfully!</h3>
            <p>I've received your message and will get back to you as soon as possible.</p>
          </div>
        `;
      } else {
        formMessage.textContent = "Something went wrong, please try again.";
        modifyClass("error", "add", formMessage);
      }
    });
}

contact.addEventListener("submit", handleSubmit);
