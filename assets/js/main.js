$(() => {
  const itemsArray = [];
  const itemsElem = $('#items');

  const searchInput = $('#search-input');
  const importButton = $('#import-button');
  const exportButton = $('#export-button');

  // Load items from localStorage
  function loadItemsFromStorage() {
    const items = localStorage.getItem('items');
    if (!items) {
      localStorage.setItem('items', JSON.stringify(itemsArray));
    } else {
      itemsArray.push(...JSON.parse(items));
    }
  }

  function renderItems(items) {
    for (item of items) {
      const itemElement = $(`
        <div class="col-sm-12 col-md-6 col-xl-3 pb-3">
          <div class="card text-bg-dark">
            <div class="card-image">
              <img src="${item.image}" class="card-img-top" />
            </div>
            <div class="card-body">
              <h5 class="card-title mb-0">${item.name}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item text-bg-dark d-flex justify-content-between align-items-center">
                € ${item.price}
                <i class="fas fa-credit-card"></i>
              </li>
              <li class="list-group-item text-bg-dark d-flex justify-content-between align-items-center">
                <a href="${item.url}" target="_blank" class="text-light">Product page on ${item.store}</a>
                <i class="fas fa-store"></i>
              </li>
              <li class="list-group-item text-bg-dark d-flex justify-content-between align-items-center">
                <a href="${item.manufacturer}" target="_blank" class="text-light">Product Information</a>
                <i class="fas fa-info-circle"></i>
              </li>
            </ul>  
          </div>
        </div>
      `);
      itemElement.appendTo(itemsElem);
    }
  }

  searchInput.on('keyup', (e) => {
    if (searchInput.val().length !== 0) {
      const results = itemsArray.filter(item => item.name.toLowerCase().includes(searchInput.val().toLowerCase()));
      itemsElem.empty();
      renderItems(results);
    } else {
      itemsElem.empty();
      renderItems(itemsArray);
    }
  });

  importButton.on('change', () => {
    const file = importButton.prop('files')[0];
    const reader = new FileReader();
    reader.onload = () => {
      const items = JSON.parse(reader.result);
      itemsArray.push(...items);
      localStorage.setItem('items', JSON.stringify(itemsArray));
      renderItems(items);
    }
    reader.readAsText(file);
  });

  exportButton.on('click', () => {
    const items = JSON.stringify(itemsArray, null, 2);
    const blob = new Blob([items], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = 'items.json';
    link.href = URL.createObjectURL(blob);
    link.click();
  });

  loadItemsFromStorage();
  renderItems(itemsArray);
});