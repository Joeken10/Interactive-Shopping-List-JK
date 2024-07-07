// src/index.js
document.addEventListener('DOMContentLoaded', () => {
  const itemInput = document.getElementById('item-input');
  const addButton = document.getElementById('add-button');
  const clearButton = document.getElementById('clear-button');
  const shoppingList = document.getElementById('shopping-list');

  let items = [];

  // Load items from local storage
  if (localStorage.getItem('shoppingListItems')) {
    items = JSON.parse(localStorage.getItem('shoppingListItems'));
    renderList();
  }

  // Add item
  addButton.addEventListener('click', () => {
    const itemText = itemInput.value.trim();
    if (itemText !== '') {
      items.push({ text: itemText, purchased: false });
      itemInput.value = '';
      renderList();
      saveToLocalStorage();
    }
  });

  // Clear list
  clearButton.addEventListener('click', () => {
    items = [];
    renderList();
    saveToLocalStorage();
  });

  // Mark item as purchased
  shoppingList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      const index = e.target.dataset.index;
      items[index].purchased = !items[index].purchased;
      renderList();
      saveToLocalStorage();
    } else if (e.target.tagName === 'BUTTON') {
      const index = e.target.dataset.index;
      const newText = prompt("Edit item here:", items[index].text);
      if (newText !== null) {
        items[index].text = newText;
        renderList();
        saveToLocalStorage();
      }
    }
  });

  function renderList() {
    shoppingList.innerHTML = '';
    items.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = item.text;
      listItem.dataset.index = index;
      if (item.purchased) {
        listItem.classList.add('purchased');
      }
      shoppingList.appendChild(listItem);
      const editButton = document.createElement('button');
      editButton.textContent = "*";
      editButton.dataset.index = index;
      listItem.appendChild(editButton);
    });
  }

  function saveToLocalStorage() {
    localStorage.setItem('shoppingListItems', JSON.stringify(items));
  }
});