function loadScript(src, callback) {
  var script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.onload = callback;
  script.onerror = function () {
    console.error("Failed to load script:", src);
  };
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function () {
  // Preload Calendly script immediately
  loadScript(
    "https://assets.calendly.com/assets/external/widget.js",
    function () {
      // Calendly popup widget
      document
        .getElementById("schedule-button")
        .addEventListener("click", function () {
          Calendly.initPopupWidget({
            url: "https://calendly.com/uswitch-info",
          });
          return false;
        });
    }
  );
});
