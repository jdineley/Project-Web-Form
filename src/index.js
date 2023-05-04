import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator";

const zipValidationMessageDiv = document.querySelector("#zip-validation");
const form = document.querySelector("form");
const h2 = document.querySelector("h2");
const confirmPasswordInput = document.querySelector("#confirm-password");

let countrySelected;
let zipSelected;
let zipTarget;
let password;

document.addEventListener(
  "blur",
  (e) => {
    h2.textContent = "";
    if (e.target.id === "button") return;
    e.target.classList.add("active");

    if (e.target.id === "country") {
      countrySelected = e.target.value;
      if (zipSelected) {
        if (!postcodeValidator(zipSelected, countrySelected)) {
          zipTarget.setCustomValidity(
            `Invalid zip code for selected country with code ${countrySelected}`
          );
          zipValidationMessageDiv.innerHTML = `&#9888; ${zipTarget.validationMessage}`;
        } else {
          zipTarget.setCustomValidity("");
          zipValidationMessageDiv.textContent = "";
        }
      }
    }
    if (e.target.id === "zip" && e.target.value && countrySelected) {
      zipSelected = e.target.value;
      zipTarget = e.target;
      if (!postcodeValidator(e.target.value, countrySelected)) {
        e.target.setCustomValidity(
          `Invalid zip code for slected country with code ${countrySelected}`
        );
      } else {
        e.target.setCustomValidity("");
      }
    } else if (e.target.id === "zip" && e.target.value) {
      zipSelected = e.target.value;
      zipTarget = e.target;
      e.target.setCustomValidity("Please select a country first");
    }
    if (e.target.id === "password" && e.target.validity.valid) {
      confirmPasswordInput.value = "";
      password = e.target.value;
    }
    if (e.target.id === "confirm-password") {
      if (e.target.value !== password) {
        e.target.setCustomValidity("The password does not match");
      } else {
        e.target.setCustomValidity("");
      }
    }

    const isValid = e.target.validity.valid;
    const message = e.target.validationMessage;
    const connectedValidationId = e.target.getAttribute("aria-describedby");
    const connectedValidation = connectedValidationId
      ? document.getElementById(connectedValidationId)
      : false;

    if (connectedValidation && message && !isValid) {
      connectedValidation.innerHTML = `&#9888; ${message}`;
    } else {
      connectedValidation.innerText = "";
    }
  },
  true
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  h2.textContent = "High Five!";
  console.log("High Five!");
});
