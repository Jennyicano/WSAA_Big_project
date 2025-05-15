// This script handles the CRUD operations for boardgames in the web application
// Load boardgames from the server and display them in the table

document.addEventListener('DOMContentLoaded', getAllBoardgames);

function getAllBoardgames() {
    $.ajax({
        url: '/boardgames',
        method: 'GET',
        dataType: 'json',
        success: function (result) {
            for (let game of result) {
                addBoardgameToTable(game);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error loading boardgames:", error);
        }
    });
}

// function to show the modal to create a new boardgame form
function showAdd() {
    document.getElementById('showAddaboardgameButton').style.display = "none";
    document.getElementById('BoardgameTable').style.display = "none";
    document.getElementById('showBoardgameForm').style.display = "block";

    document.getElementById('createLabel').style.display = "inline";
    document.getElementById('updateLabel').style.display = "none";

    document.getElementById('doCreateButton').style.display = "inline-block";
    document.getElementById('doUpdateButton').style.display = "none";

    clearForm();
}

// function to show the modal to view all boardgames
function showViewAll() {
    document.getElementById('showAddaboardgameButton').style.display = "block";
    document.getElementById('BoardgameTable').style.display = "block";
    document.getElementById('showBoardgameForm').style.display = "none";
}

// function to show the modal for updating an existing boardgame
function showUpdate(button) {
    const row = button.parentNode.parentNode;
    const boardgame = getBoardgameFromRow(row);
    populateFormWithBoardgame(boardgame);

    document.getElementById('showAddaboardgameButton').style.display = "none";
    document.getElementById('BoardgameTable').style.display = "none";
    document.getElementById('showBoardgameForm').style.display = "block";

    document.getElementById('createLabel').style.display = 'none';
    document.getElementById('updateLabel').style.display = 'inline';
    document.getElementById('doCreateButton').style.display = 'none';
    document.getElementById('doUpdateButton').style.display = 'inline-block';
}

// Create new boardgame
function doCreate() {
    const game = getBoardgameFromForm();
    $.ajax({
        url: '/boardgames',
        method: 'POST',
        data: JSON.stringify(game),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (result) {
            game.id = result.id;
            addBoardgameToTable(game);
            clearForm();
            showViewAll();
        },
        error: function (xhr, status, error) {
            console.error("Error creating boardgame:", error);
        }
    });
}

// Update existing boardgames with new data
function doUpdate() {
    const game = getBoardgameFromForm();
    $.ajax({
        url: `/boardgames/${game.id}`,
        method: 'PUT',
        data: JSON.stringify(game),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function () {
            const row = document.getElementById(game.id);
            setBoardgameInRow(row, game);
            clearForm();
            showViewAll();
        },
        error: function (xhr, status, error) {
            console.error("Error updating boardgame:", error);
        }
    });
}

// Delete a boardgame
function doDelete(button) {
    const row = button.parentNode.parentNode;
    const id = row.getAttribute("id");
    if (!confirm("Are you sure you want to delete this boardgame?")) return;

    $.ajax({
        url: `/boardgames/${id}`,
        method: 'DELETE',
        success: function () {
            row.remove();
        },
        error: function (xhr, status, error) {
            console.error("Error deleting boardgame:", error);
        }
    });
}

function getBoardgameFromRow(row) {
    return {
        id: row.cells[0].textContent,
        Name: row.cells[1].textContent,
        Product_type: row.cells[2].textContent,
        Age_range: row.cells[3].textContent,
        Players: row.cells[4].textContent,
        Price: row.cells[5].textContent
    };
}

function setBoardgameInRow(row, game) {
    row.cells[0].textContent = game.id;
    row.cells[1].textContent = game.Name;
    row.cells[2].textContent = game.Product_type;
    row.cells[3].textContent = game.Age_range;
    row.cells[4].textContent = game.Players;
    row.cells[5].textContent = game.Price;
}

function populateFormWithBoardgame(game) {
    const form = document.getElementById('showBoardgameForm');
    form.querySelector('input[name="id"]').value = game.id;
    form.querySelector('input[name="Name"]').value = game.Name;
    form.querySelector('input[name="Product_type"]').value = game.Product_type;
    form.querySelector('input[name="Age_range"]').value = game.Age_range;
    form.querySelector('input[name="Players"]').value = game.Players;
    form.querySelector('input[name="Price"]').value = game.Price;
}

function getBoardgameFromForm() {
    const form = document.getElementById('showBoardgameForm');
    return {
        id: form.querySelector('input[name="id"]').value,
        Name: form.querySelector('input[name="Name"]').value,
        Product_type: form.querySelector('input[name="Product_type"]').value,
        Age_range: parseInt(form.querySelector('input[name="Age_range"]').value),
        Players: parseInt(form.querySelector('input[name="Players"]').value),
        PPrice: parseInt(form.querySelector('input[name="Price"]').value)
    };
}
 
// This function clears the values of the form fields
function clearForm() {
    document.getElementById('idInput').value = '';
    document.getElementById('nameInput').value = '';
    document.getElementById('productTypeInput').value = '';
    document.getElementById('ageRangeInput').value = '';
    document.getElementById('playersInput').value = '';
    document.getElementById('priceInput').value = '';
}

function addBoardgameToTable(game) {
    const table = document.getElementById('BoardgameTable');
    const row = table.insertRow(-1);
    row.setAttribute("id", game.id);

    row.insertCell(0).textContent = game.id;
    row.insertCell(1).textContent = game.Name;
    row.insertCell(2).textContent = game.Product_type;
    row.insertCell(3).textContent = game.Age_range;
    row.insertCell(4).textContent = game.Players;
    row.insertCell(5).textContent = game.Price;

    row.insertCell(6).innerHTML = '<button onclick="showUpdate(this)">Update</button>';
    row.insertCell(7).innerHTML = '<button onclick="doDelete(this)">Delete</button>';
}

