// script1.js

const form = document.getElementById('password-form');
const viewDatabaseBtn = document.getElementById('view-database');


form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission (page reload)

    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const entry = { website, username, password };

    const storedData = JSON.parse(localStorage.getItem('storedData')) || [];

    storedData.push(entry);
    

    localStorage.setItem('storedData', JSON.stringify(storedData));
    viewDatabaseBtn.style.display = 'block';
    form.reset();
    
});

window.addEventListener("DOMContentLoaded", function () {
    // Add "lifted" class when the website loads
    const instructionBox = document.querySelector(".instructions-box");
    instructionBox.classList.add("lifted");
  
    // Add "lifted" class when scrolling
    window.addEventListener("scroll", function () {
      const scrollY = window.scrollY;
      if (scrollY > 20) { // Adjust the scroll threshold as needed
        instructionBox.classList.add("lifted");
      } else {
        instructionBox.classList.remove("lifted");
      }
    });
  });

