// Translations JSON
const languageButton = document.getElementById("language-button");
const languageOptions = document.getElementById("language-options");
const languageOptionsChildren = Array.from(languageOptions.children);

languageButton.addEventListener("click", function () {
  languageOptions.classList.toggle("hidden");
});

languageOptionsChildren.forEach(function (option) {
  option.addEventListener("click", function () {
    // Get the selected language and flag
    const language = option.dataset.value.toUpperCase();
    const flag = option.querySelector(".flag-icon").className;

    // Update the selected language and flag
    document.getElementById("selected-language").innerHTML =
      language + " <span class='" + flag + " mr-2'></span>";

    // Hide the language options and load the translations
    languageOptions.classList.add("hidden");
    loadTranslations(language);
  });
});

document.addEventListener("click", function (event) {
  let isClickInside = document
    .getElementById("language-changer")
    .contains(event.target);

  if (!isClickInside) {
    // The click was outside the #language-changer element, hide the dropdown
    document.getElementById("language-options").classList.add("hidden");
  }
});

function loadTranslations(language) {
  language = language.toLowerCase();
  document.documentElement.lang = language;

  fetch(`translations/${language}.json`)
      .then((response) => response.json())
      .then((data) => {
          const translations = data;
          const elements = document.querySelectorAll("[data-translation-key]");

          elements.forEach((element) => {
              const key = element.getAttribute("data-translation-key");
              const keys = key.split(/[\[\]]/);
              let translation;
              if (keys.length > 1) {
                  translation = translations[keys[0]][parseInt(keys[1])];
              } else {
                  translation = translations[key];
              }

              if (translation === undefined) {
                  console.error(`Translation for key "${key}" not found.`);
              }

              if (element.hasAttribute("placeholder")) {
                  element.setAttribute("placeholder", translation);
              } else {
                  // Handle nested elements separately
                  if (element.querySelectorAll("[data-translation-key]").length > 0) {
                      element.childNodes.forEach((child) => {
                          if (child.nodeType === Node.TEXT_NODE) {
                              child.textContent = translation;
                          }
                      });
                  } else {
                      element.innerHTML = translation;
                  }
              }
          });

          // Handle nested elements separately
          const nestedElements = document.querySelectorAll("[data-translation-key] a[data-translation-key]");
          nestedElements.forEach((element) => {
              const key = element.getAttribute("data-translation-key");
              const translation = translations[key];

              if (translation === undefined) {
                  console.error(`Translation for key "${key}" not found.`);
              } else {
                  element.innerHTML = translation;
              }
          });
      })
      .catch((error) => {
          console.error("Error loading translations:", error);
      });
  }
// Load translations when the page loads
loadTranslations("ee"); // Default language