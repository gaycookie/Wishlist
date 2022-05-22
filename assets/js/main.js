$(() => {
  const itemsArray = [];
  const itemsElem = $('#items');

  const searchInput = $('#search-input');
  const importButton = $('#import-button');
  const exportButton = $('#export-button');

  const addModal = $('#add-modal');
  const formAddForm = $('#add-form');
  const formClearButton = $('#form-clear');

  function loadItemsFromStorage() {
    const items = localStorage.getItem('items');
    if (!items) {
      localStorage.setItem('items', JSON.stringify(itemsArray));
    } else {
      itemsArray.push(...JSON.parse(items));
    }
  }

  function renderItems(items) {
    itemsElem.empty();
    for (item of items) {
      const colDiv = $('<div class="col-sm-12 col-md-6 col-xl-3 pb-3"></div>');
      const cardDiv = $('<div class="card text-bg-dark"></div>');

      const cardImageDiv = $('<div class="card-image"></div>');
      const cardImageImg = $(`<img class="card-img-top" src="${item.image}" alt="${item.name}" />`);
      cardImageDiv.append(cardImageImg);
      
      const cardBodyDiv = $('<div class="card-body"></div>');
      const cardTitleH5 = $(`<h5 class="card-title mb-0">${item.name}</h5>`);
      cardBodyDiv.append(cardTitleH5);

      const listGroupUl = $('<ul class="list-group list-group-flush"></ul>');

      const listItemPriceLi = $(`<li class="list-group-item text-bg-dark d-flex justify-content-between align-items-center"></li>`);
      const listItemPriceText = `€ ${item.price} (${moment(item.timestamp).format('ll')})`;
      const listItemPriceIcon = $('<i class="fas fa-credit-card"></i>');
      listItemPriceLi.append(listItemPriceText, listItemPriceIcon);

      const listItemLinkLi = $(`<li class="list-group-item text-bg-dark d-flex justify-content-between align-items-center"></li>`);
      const listItemLinkText = $(`<a href="${item.link}" class="text-light" target="_blank">Product on ${item.store}</a>`);
      const listItemLinkIcon = $('<i class="fas fa-store"></i>');
      listItemLinkLi.append(listItemLinkText, listItemLinkIcon);

      const listItemManuLi = $(`<li class="list-group-item text-bg-dark d-flex justify-content-between align-items-center"></li>`);
      const listItemManuText = $(`<a href="${item.manufacturer}" class="text-light" target="_blank">Product Specifications</a>`);
      const listItemManuIcon = $('<i class="fas fa-industry"></i>');
      listItemManuLi.append(listItemManuText, listItemManuIcon);

      listGroupUl.append(listItemPriceLi, listItemLinkLi, listItemManuLi);
      cardDiv.append(cardImageDiv, cardBodyDiv, listGroupUl);
      colDiv.append(cardDiv);

      itemsElem.append(colDiv);
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
      renderItems(itemsArray);
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

  formClearButton.on('click', () => {
    formAddForm.removeClass('was-validated');
    formAddForm.trigger('reset');
  });

  formAddForm.on('submit', (e) => {
    e.preventDefault();

    if (!formAddForm[0].checkValidity()) {
      e.preventDefault();
      e.stopPropagation();

      formAddForm.addClass('was-validated');
      return;
    }

    itemsArray.unshift({
      name: $('#form-product-name').val(),
      store: $('#form-store-name').val(),
      price: $('#form-price').val(),
      timestamp: new Date(),
      image: $('#form-image').val(),
      link: $('#form-link').val(),
      manufacturer: $('#form-manufacturer').val(),
    });

    addModal.modal('hide');
    localStorage.setItem('items', JSON.stringify(itemsArray));
    renderItems(itemsArray);

    formAddForm.removeClass('was-validated');
    formAddForm.trigger('reset');
  });

  loadItemsFromStorage();
  renderItems(itemsArray);
});