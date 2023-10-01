window.addEventListener("DOMContentLoaded", function () {
  // Add "lifted" class when the website loads
  const instructionBox = document.querySelector(".instructions-box");
  instructionBox.classList.add("lifted");

  // Check if the query parameter "data" is present and set to "true"
  const urlParams = new URLSearchParams(window.location.search);
  const dataParam = urlParams.get("data");

  if (dataParam === "true") {
    // If data is present, remove the "No Data in Database" message
    const noDataMessage = document.getElementById("no-data-message");
    noDataMessage.style.display = "none";
  }

  // Add "lifted" class when scrolling
  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    if (scrollY > 20) {
      instructionBox.classList.add("lifted");
    } else {
      instructionBox.classList.remove("lifted");
    }
  });
});

