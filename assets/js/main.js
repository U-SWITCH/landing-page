document.addEventListener("DOMContentLoaded", function () {
  // Auto update copyright year
  document.querySelector("#copyright-year").innerText =
    new Date().getFullYear();

  // Mobile menu toggle
  document.getElementById("menu-button").addEventListener("click", function () {
    let menu = document.getElementById("mobile-menu");
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
      setTimeout(function () {
        menu.classList.add("show");
      }, 10); // Small delay to ensure the transition works
    } else {
      menu.classList.remove("show");
      setTimeout(function () {
        menu.classList.add("hidden");
      }, 300); // Delay to match the transition duration
    }
  });

  // Close mobile menu when a menu item is clicked
  document.querySelectorAll(".mobile-menu-item").forEach(function (item) {
    item.addEventListener("click", function () {
      let menu = document.getElementById("mobile-menu");
      menu.classList.remove("show");
      setTimeout(function () {
        menu.classList.add("hidden");
      }, 300); // Delay to match the transition duration
    });
  });

  // Handle active link coloring based on URL hash
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    const hash = window.location.hash;
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === hash) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Set active link on page load
  setActiveLink();

  // Set active link on hash change
  window.addEventListener("hashchange", setActiveLink);

  // Background animation for the CCTV section
  const cctvSection = document.querySelector(".cctv-section-background");
  let positions = [
    { position: "center", size: "cover" },
    { position: "top left", size: "cover" },
    { position: "top right", size: "cover" },
    { position: "center", size: "cover" },
  ];
  let index = 0;

  function animateBackground() {
    if (window.innerWidth > 768) {
      // Disable animation for screens smaller than 768px
      cctvSection.style.backgroundPosition = positions[index].position;
      cctvSection.style.backgroundSize = positions[index].size;
      index = (index + 1) % positions.length;
      setTimeout(animateBackground, 10000); // Increase the interval to 10 seconds
    }
  }

  // Start the animation immediately
  animateBackground();

  // Re-check on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      animateBackground();
    } else {
      // Reset to default for smaller screens
      cctvSection.style.backgroundPosition = "center";
      cctvSection.style.backgroundSize = "cover";
    }
  });

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
        const nestedElements = document.querySelectorAll(
          "[data-translation-key] a[data-translation-key]"
        );
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
});
