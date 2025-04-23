async function loadboardgame() {
    const res = await fetch('/api/boardgame');
    const items = await res.json();
    const list = document.getElementById('itemList');
    list.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input value="${item.name}" onchange="updateItem(${item.id}, this.value)">
            <button onclick="deleteItem(${item.id})">Delete</button>
        `;
        list.appendChild(li);
    });
}

async function addboardgame() {
    const name = document.getElementById('itemName').value;
    await fetch('/api/boardgame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    document.getElementById('boardgameName').value = '';
    loadItems();
}

async function updateboardgame(id, name) {
    await fetch(`/api/boardgame/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    loadItems();
}

async function deleteBoardgame(id) {
    await fetch(`/api/boardgame/${id}`, {
        method: 'DELETE'
    });
    loadItems();
}

loadItems();