// Ouverture/Fermeture du menu Responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Elements du DOM 
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close");

// Ouverture modale
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  modalbg.style.display = "flex";
}

// Fermeture modale
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

function closeModal() {
  modalbg.style.animationPlayState = "running";
  setTimeout(function() {
    modalbg.style.display = "none";
    modalbg.style.animationPlayState = "paused";
  }, 1000) 
}


// Validation du formulaire
// Récupération des données du formulaire
const formData = document.querySelectorAll(".formData");
var email = document.querySelector("#email");
var locationsContainer = document.querySelector("#locationsContainer");
var locations = locationsContainer.querySelectorAll('[name="location"]');
var terms = document.querySelector("#checkbox1");

var locationError = document.getElementById("locationError");
var termsError = document.getElementById("termsError");

// Validation avancée de l'email
var defaultRegexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]$/;
var customRegexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

var checkEmail = function () {
  if (defaultRegexEmail.test(email.value) || email.value == "") {
    var defaultValue = true;
  } else {
    var defaultValue = false;
  }
  
  if (defaultValue == true && !customRegexEmail.test(email.value)) {
    email.setCustomValidity("Il manque la dernière partie de l'adresse mail (.com, .fr...).");
  } else {
    email.setCustomValidity("");
  }
}

email.addEventListener("input", checkEmail);

// Validation avancée du choix du tournoi
var enabledChoice = [];

locations.forEach(function(radios) {
  radios.addEventListener('change', function() {
    enabledChoice = 
      Array.from(locations).filter(i => i.checked).map(i => i.value);

    console.log(enabledChoice);
    locationError.innerHTML = "";
  })
});

// Validation finale du formulaire
function validate() {
  console.log("Lancé")

  if (enabledChoice == "") {
    locationError.innerHTML = "<p>Vous devez choisir un tournoi.</p>";
    return false;
  }

  if (!terms.checked) {
    termsError.innerHTML = "<p>Vous devez accepter les conditions d'utilisation.</p>";
    return false;
  } else {
    termsError.innerHTML = "";
  }

  return true;
}

// Gestion du comportement après validation

