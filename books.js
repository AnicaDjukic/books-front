function fetchData() {
  fetch('http://localhost:63576/api/books')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(books => {
      console.log('Retrieved books:', books);
      renderData(books);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function renderData(data) {

  var table = document.querySelector('table tbody');

  for (i = 0; i < data.length; i++) {
    let newRow = document.createElement('tr');

    let cell1 = document.createElement('td');
    cell1.textContent = data[i]['name'];
    newRow.appendChild(cell1);

    let cell2 = document.createElement('td');
    cell2.textContent = data[i]['author'];
    newRow.appendChild(cell2);

    let cel3 = document.createElement('td');
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.width = 'auto';
    const bookId = data[i]['id'];
    editButton.onclick = function () {
      window.location.href = 'edit-book.html?id=' + bookId;
    };
    cel3.appendChild(editButton);
    newRow.appendChild(cel3);

    let cel4 = document.createElement('td');
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.width = 'auto';
    deleteButton.onclick = function () {
      fetch('http://localhost:63576/api/books/' + bookId, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
          }
          console.log('Delete request was successful.');
          window.location.href = 'books.html';
        })
        .catch(error => {
          console.error('Error:', error.message);
        });
    };
    cel4.appendChild(deleteButton);
    newRow.appendChild(cel4);

    table.appendChild(newRow);
  }
}


fetchData();