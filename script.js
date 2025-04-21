async function loadItems() {
    const res = await fetch('/api/items');
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

async function addItem() {
    const name = document.getElementById('itemName').value;
    await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    document.getElementById('itemName').value = '';
    loadItems();
}

async function updateItem(id, name) {
    await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    loadItems();
}

async function deleteItem(id) {
    await fetch(`/api/items/${id}`, {
        method: 'DELETE'
    });
    loadItems();
}

loadItems();