// This script handles the CRUD operations for boardgames in the web application
// Load boardgames from the server and display them in the table

function getAllBoardgames() {
    $.ajax({
        url: '/boardgames',
        method: 'GET',
        dataType: 'json',
        success: function (result) {
            console.log("Fetched Boardgames:", result);
            const tbody = document.getElementById('BoardgameTableBody');
            // Clean the table to avoid any duplicate
            tbody.innerHTML = '';

            for (let game of result) {
                addBoardgameToTable(game);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error loading boardgames:", xhr.responseText || error);
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
        contentType: 'application/json',
        data: JSON.stringify(game),
        success: function (createdGame) {
            clearForm();
            showViewAll();
            showMessage(`Board game "${createdGame.Name}" created successfully!`, 'success');
        },
        error: function (xhr, status, error) {
            console.error("Error creating boardgame:", xhr.responseText || error);
            showMessage("Error creating boardgame.", 'error');
        }
    });
}


// Update existing boardgames with new data
function doUpdate() {
    const game = getBoardgameFromForm();
    $.ajax({
        url: `/boardgames/${game.id}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(game),
        success: function () {
            clearForm();
            showViewAll();
            showMessage(`Board game ID ${game.id} updated successfully!`, 'info');
            document.getElementById('BoardgameTableBody').innerHTML = '';
            getAllBoardgames();
        },
        error: function (xhr, status, error) {
            console.error("Error updating boardgame:", xhr.responseText || error);
            showMessage("Error updating boardgame.", 'error');
        }
    });
}

// Delete a boardgame
function doDelete(button) {
    const row = button.closest('tr');
    const id = row.getAttribute("id");

    if (!confirm("Are you sure you want to delete this boardgame?")) return;

    $.ajax({
        url: `/boardgames/${id}`,
        method: 'DELETE',
        success: function () {
            row.remove();
            showMessage(`Board game ID ${id} deleted successfully.`, 'info');
        },
        error: function (xhr, status, error) {
            console.error("Error deleting boardgame:", xhr.responseText || error);
            showMessage("Error deleting boardgame.", 'error');
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
        Age_range: form.querySelector('input[name="Age_range"]').value,
        Players: form.querySelector('input[name="Players"]').value,
        Price: parseInt(form.querySelector('input[name="Price"]').value)
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
    const tbody = document.getElementById('BoardgameTableBody');
    const row = tbody.insertRow(-1);
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

function showMessage(message, type = 'success') {
    const messageArea = document.getElementById('messageArea');
    const backToMainButton = document.getElementById('backToMainButton');

    messageArea.textContent = message;
    messageArea.className = 'alert alert-' + type;
    messageArea.style.display = 'block';

    setTimeout(() => {
        messageArea.style.display = 'none';
        backToMainButton.style.display ='none';
    }, 3000);
}
