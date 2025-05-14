// This script handles the CRUD operations for boardgames in the web application
// Load boardgames from the server and display them in the table
async function loadBoardgames() {
    const response = await fetch('/boardgames');
    const boardgames = await response.json();

    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';

    boardgames.forEach(game => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${game.id}</td>
            <td>${game.Name}</td>
            <td>${game.Product_type}</td>
            <td>${game.Age_range}</td>
            <td>${game.Players}</td>
            <td>${game.Price}</td>
            <td><button onclick="showUpdate(${game.id})">Update</button></td>
            <td><button onclick="deleteBoardgame(${game.id})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// function to show the modal for creating a new boardgame
function showAdd() {
    clearForm();
    document.getElementById('exampleModalLabel').innerText = 'Create a Boardgame';
    document.getElementById('doCreateButton').style.display = 'inline-block';
    document.getElementById('doUpdateButton').style.display = 'none';
    $('#addBoardgameModal').modal('show');
}

// function to show the modal for updating an existing boardgame
async function showUpdate(id) {
    const response = await fetch(`/boardgames/${id}`);
    const game = await response.json();

    document.getElementById('idInput').value = game.id;
    document.getElementById('nameInput').value = game.Name;
    document.getElementById('productTypeInput').value = game.Product_type;
    document.getElementById('ageRangeInput').value = game.Age_range;
    document.getElementById('playersInput').value = game.Players;
    document.getElementById('priceInput').value = game.Price;

    document.getElementById('exampleModalLabel').innerText = 'Update Boardgame';
    document.getElementById('doCreateButton').style.display = 'none';
    document.getElementById('doUpdateButton').style.display = 'inline-block';
    $('#addBoardgameModal').modal('show');
}

// Create new boardgame
async function doCreate() {
    const boardgame = readForm();

    await fetch('/boardgames', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(boardgame)
    });

    $('#addBoardgameModal').modal('hide');
    loadBoardgames();
}

// Update existing boardgame with new data
async function doUpdate() {
    const id = document.getElementById('idInput').value;
    const boardgame = readForm();

    await fetch(`/boardgames/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(boardgame)
    });

    $('#addBoardgameModal').modal('hide');
    loadBoardgames();
}

// Delete a boardgame
async function deleteBoardgame(id) {
    if (confirm('Are you sure you want to delete this boardgame?')) {
        await fetch(`/boardgames/${id}`, {
            method: 'DELETE'
        });
        loadBoardgames();
    }
}

// Helper: Read form data
// This function reads the values from the form fields and returns them as an object
function readForm() {
    return {
        Name: document.getElementById('nameInput').value,
        Product_type: document.getElementById('productTypeInput').value,
        Age_range: document.getElementById('ageRangeInput').value,
        Players: document.getElementById('playersInput').value,
        Price: document.getElementById('priceInput').value
    };
}

// Helper: Clear form fields 
// This function clears the values of the form fields
function clearForm() {
    document.getElementById('idInput').value = '';
    document.getElementById('nameInput').value = '';
    document.getElementById('productTypeInput').value = '';
    document.getElementById('ageRangeInput').value = '';
    document.getElementById('playersInput').value = '';
    document.getElementById('priceInput').value = '';
}

// Load boardgames when page loads
document.addEventListener('DOMContentLoaded', loadBoardgames);
