// script2.js

// After adding data, set the display property of data-check to 'block'
document.getElementById('data-check').style.display = 'block';


document.addEventListener('DOMContentLoaded', function () {
    const dataTable = document.getElementById('data-table');

    // Get stored data from localStorage
    const storedData = JSON.parse(localStorage.getItem('storedData')) || [];

    // Function to convert a plain text password into asterisks
    function maskPassword(password) {
        return '*'.repeat(password.length);
    }

    // Function to delete a row and remove data from localStorage
    function deleteRow(index) {
        storedData.splice(index, 1);
        localStorage.setItem('storedData', JSON.stringify(storedData));
        renderTable(); // Refresh the table
    }

    // Function to copy a password to the clipboard
    function copyPassword(password) {
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = password;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    }

    // Function to render the table
    function renderTable() {
        dataTable.innerHTML = ''; // Clear the table

        // Populate the table
        storedData.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.website}</td>
                <td>${entry.username}</td>
                <td>${maskPassword(entry.password)}</td>
                <td>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
                <td>
                    <button class="copy-btn" data-password="${entry.password}">Copy</button>
                </td>
            `;
            
            // Add a click event listener to the delete button
            const deleteButton = row.querySelector('.delete-btn');
            deleteButton.addEventListener('click', function () {
                const dataIndex = parseInt(this.getAttribute('data-index'));
                deleteRow(dataIndex);
            });

            // Add a click event listener to the copy button
            const copyButton = row.querySelector('.copy-btn');
            copyButton.addEventListener('click', function () {
                const passwordToCopy = this.getAttribute('data-password');
                copyPassword(passwordToCopy);
            });

            dataTable.appendChild(row);
        });
    }

    // Initial rendering of the table
    renderTable();
});


// Retrieve data from local storage
const storedData = localStorage.getItem("storedData");
const dataTable = document.getElementById("data-table");

if (storedData) {
    const parsedData = JSON.parse(storedData);
    // Populate the table with data
    parsedData.forEach((data, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${data.website}</td>
            <td>${data.username}</td>
            <td>${data.password}</td>
            <td><!-- Add actions here --></td>
            <td><!-- Add copy button here --></td>
        `;
        dataTable.appendChild(row);
    });

    // Send a signal to index.html that data is present
    const signal = new URLSearchParams(window.location.search);
    signal.set("data", "true");
    window.history.replaceState({}, document.title, `${window.location.pathname}?${signal.toString()}`);
}