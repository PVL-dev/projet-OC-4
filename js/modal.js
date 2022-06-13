// Ouverture/Fermeture du menu Responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Elements de la fenêtre modale
const modalBground = document.querySelector(".bground");
const registerBtn = document.querySelectorAll(".register-btn");
const closeBtn = document.querySelector(".close");

// Ouverture modale
registerBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  modalBground.style.display = "flex";
}

// Fermeture modale
closeBtn.addEventListener("click", closeModal);

function closeModal() {
  modalBground.style.animationPlayState = "running";
  setTimeout(function() {
    modalBground.style.display = "none";
    modalBground.style.animationPlayState = "paused";
  }, 1000);
}


// Validation du formulaire
// Récupération des données du formulaire
const form = document.querySelector("#inscriptionForm");
const confirmationModal = document.querySelector("#confirmModal");
var firstName = document.querySelector("#firstName");
var lastName = document.querySelector("#lastName");
var email = document.querySelector("#email");
var birthdate = document.querySelector("#birthdate");
var quantity = document.querySelector("#quantity");
var locationsContainer = document.querySelector("#locationsContainer");
var locations = locationsContainer.querySelectorAll('[name="location"]');
var terms = document.querySelector("#checkbox1");

var firstNameError = document.querySelector("#firstNameError");
var lastNameError = document.querySelector("#lastNameError");
var emailError = document.querySelector("#emailError");
var birthdateError = document.querySelector("#birthdateError");
var quantityError = document.querySelector("#quantityError");
var locationError = document.querySelector("#locationError");
var termsError = document.querySelector("#termsError");

// Validation du prénom
function checkFirstName() {
  if (firstName.value == "") {
    firstNameError.innerHTML = "<p>Vous devez renseigner un Prénom.</p>";
    firstNameErrorValue = true;
  } else {
    if (firstName.value.length < 2) {
      firstNameError.innerHTML = "<p>Le Prénom doit faire plus de 2 caractères.</p>";
      firstNameErrorValue = true;
    } else {
      firstNameError.innerHTML = "";
      firstNameErrorValue = false;
    }
  }
}

firstName.addEventListener("input", checkFirstName);

// Validation du nom
function checkLastName() {
  if (lastName.value == "") {
    lastNameError.innerHTML = "<p>Vous devez renseigner un Nom.</p>";
    lastNameErrorValue = true;
  } else {
    lastNameError.innerHTML = "";
    lastNameErrorValue = false;
  }
}

lastName.addEventListener("input", checkLastName);

// Validation de l'email
var defaultRegexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]$/;
var regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

function checkEmail() {
  if (email.value == "") {
    emailError.innerHTML = "<p>Vous devez renseigner une adresse email.</p>";
    emailErrorValue = true;
  } else {
    if (!regexEmail.test(email.value)) {
      emailError.innerHTML = "<p>L'adresse mail doit respecter ce format : monmail@email.com</p>";
      emailErrorValue = true;
    } else {
      emailError.innerHTML = "";
      emailErrorValue = false;
    }
  }
}

email.addEventListener("input", checkEmail);

// Validation de la Date de naissance
function checkBirthdate() {
  if (birthdate.value == "") {
    birthdateError.innerHTML = "<p>Vous devez renseigner une date de naissance.</p>";
    birthdateErrorValue = true;
  } else {
    birthdateError.innerHTML = "";
    birthdateErrorValue = false;
  }
}

birthdate.addEventListener("input", checkBirthdate);

// Validation du nombre de tournois
function checkQuantity() {
  if (quantity.value == "") {
    quantityError.innerHTML = "<p>Vous devez indiquer votre nombre de participations.</p>";
    quantityErrorValue = true;
  } else {
    quantityError.innerHTML = "";
    quantityErrorValue = false;
  }
}

quantity.addEventListener("input", checkQuantity);

// Validation du choix du tournoi
enabledChoice = [];

locations.forEach(function(radios) {
  radios.addEventListener('change', function() {
    enabledChoice = 
      Array.from(locations).filter(i => i.checked).map(i => i.value);

    console.log(enabledChoice);
    locationError.innerHTML = "";
  })
});

// Validation des conditions d'utilisation
function checkTerms() {
  if (!terms.checked) {
    termsError.innerHTML = "<p>Vous devez accepter les conditions d'utilisation.</p>";
    termsErrorValue = true;
  } else {
    termsError.innerHTML = "";
    termsErrorValue = false;
  }
}

terms.addEventListener("change", checkTerms);

// Validation finale du formulaire
function validate() {
  checkFirstName();
  checkLastName();
  checkEmail();
  checkBirthdate();
  checkQuantity();
  checkTerms();

  if (enabledChoice == "") {
    locationError.innerHTML = "<p>Vous devez choisir un tournoi.</p>";
    return false;
  }

  if (firstNameErrorValue === true || lastNameErrorValue === true || emailErrorValue === true || birthdateErrorValue === true || quantityErrorValue === true || termsErrorValue === true) {
    console.log("Erreur form");
    return false;
  }

  closeModal();
  confirmation();

  form.reset();
  enabledChoice = [];

  return false;
}


// Affichage de la confirmation après validation
function confirmation() {
  confirmationModal.style.display = "flex";
  setTimeout(function() {
    confirmationModal.style.display = "none";
  }, 7000);
}

