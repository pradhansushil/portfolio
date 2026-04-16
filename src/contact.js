const contact = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const contactName = document.getElementById("name");
const contactEmail = document.getElementById("email");
const contactMessage = document.getElementById("message");
const submitBtn = document.getElementById("submit-btn");

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

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function handleErrors() {
  let hasError = false;
  let errorMessage = "";

  if (contactName.value.trim() === "") {
    hasError = true;
    modifyClass("input-error", "add", contactName);
    errorMessage = "All fields are required to be filled";
  }

  if (contactEmail.value.trim() === "") {
    hasError = true;
    modifyClass("input-error", "add", contactEmail);
    errorMessage = "All fields are required to be filled";
  } else if (!validateEmail(contactEmail.value.trim())) {
    hasError = true;
    modifyClass("input-error", "add", contactEmail);
    errorMessage = "Please enter a valid email address";
  }

  if (contactMessage.value.trim() === "") {
    hasError = true;
    modifyClass("input-error", "add", contactMessage);
    errorMessage = "All fields are required to be filled";
  }

  if (hasError) {
    formMessage.textContent = errorMessage;
    modifyClass("error", "add", formMessage);
    return true;
  }
  return false;
}

function handleSubmit(event) {
  event.preventDefault();
  formMessage.textContent = "";
  clearErrors();
  if (handleErrors()) return;

  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  fetch(contact.getAttribute("action"), {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: new FormData(contact),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        document.querySelector(".form-container").innerHTML = `
          <div class="success-container">
            <h3>Email sent successfully!</h3>
            <p>I've received your message and will get back to you as soon as possible.</p>
          </div>
        `;
      } else {
        formMessage.textContent = "Something went wrong, please try again.";
        modifyClass("error", "add", formMessage);

        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    })
    .catch((error) => {
      formMessage.textContent = "Oops! There was a network error.";
      modifyClass("error", "add", formMessage);

      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    });
}

contact.addEventListener("submit", handleSubmit);
