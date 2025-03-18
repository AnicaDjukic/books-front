function initialize() {
  let addBtn = document.querySelector("#addBtn")
  addBtn.addEventListener("click", function () {
    window.location.href = './bookForm/bookForm.html'
  })

  getAll()
}

function getAll() {
  fetch('http://localhost:63576/api/books') // Pravi GET zahtev da dobavi sve knjige sa servera
    .then(response => {
      if (!response.ok) {
        // Ako se vrati statusni kod koji nije iz 2xx, tretiraj kao grešku
        throw new Error('Request failed. Status: ' + response.status)
      }
      return response.json()
    })
    .then(books => renderData(books))       // Ako su podaci ispravni, prikaži ih u HTMLu
    .catch(error => {                       // Ako podaci nisu ispravni, sakrij tabelu i prikaži poruku o grešci
      console.error('Error:', error.message)
      // Sakrij tabelu
      let table = document.querySelector('table')
      if (table) {
        table.style.display = 'none'
      }
      // Prikaži poruku o grešci
      alert('An error occurred while loading the data. Please try again.')
    })
}

function renderData(data) {
  let table = document.querySelector('table tbody')
  // Ispraznimo tabelu pre nego što dodamo nove podatke
  table.innerHTML = '';  // Ovo briše sve redove u tabeli

  let tableHeader = document.querySelector('table thead') // Zaglavlje tabele

  // Ako lista podataka (data) je prazna
  if (data.length === 0) {
    // Sakrij zaglavlje tabele
    tableHeader.classList.add('hidden')

    // Prikaži poruku da nema podataka za prikazivanje
    let noDataMessage = document.querySelector('#no-data-message')
    noDataMessage.classList.remove('hidden')

  } else {
    // Ukloniti poruku da nema podataka za prikazivanje
    let noDataMessage = document.querySelector('#no-data-message')
    noDataMessage.classList.add('hidden')

    // Prikazivanje zaglavlja tabele
    tableHeader.classList.remove('hidden')

    // Za svaku knjigu dodajemo red u tabeli koji ima četiri ćelije (naziv, autor, edit, delete)
    data.forEach(book => {
      let newRow = document.createElement('tr')

      // Kreiranje ćelije za naziv knjige
      let cell1 = document.createElement('td')
      cell1.textContent = book['name']
      newRow.appendChild(cell1)

      // Kreiranje ćelije za autora
      let cell2 = document.createElement('td')
      cell2.textContent = book['author']
      newRow.appendChild(cell2)

      // Kreiranje ćelije za dugme "Edit"
      let cell3 = document.createElement('td')
      let editButton = document.createElement('button')
      editButton.textContent = 'Edit'
      editButton.addEventListener('click', function () {
        window.location.href = './bookForm/bookForm.html?id=' + book['id']
      })
      cell3.appendChild(editButton)
      newRow.appendChild(cell3)

      // Kreiranje ćelije za dugme "Delete"
      let cell4 = document.createElement('td')
      let deleteButton = document.createElement('button')
      deleteButton.textContent = 'Delete'
      deleteButton.addEventListener('click', function () {
        fetch('http://localhost:63576/api/books/' + book['id'], { method: 'DELETE' })
          .then(response => {
            if (!response.ok) {
              // Ako statusni kod nije iz 2xx (npr. 404), kreiramo grešku
              const error = new Error('Request failed. Status: ' + response.status);
              error.response = response; // Dodajemo ceo response objekat u grešku
              throw error;  // Bacamo grešku
            }
            getAll() // Ponovo učitaj podatke nakon brisanja
          })
          .catch(error => {
            console.error('Error:', error.message)
            if (error.response && error.response.status === 404) {
              alert('Book does not exist!')
            } else {
              alert('An error occurred while deleting the book. Please try again.')
            }
          })
      })
      cell4.appendChild(deleteButton)
      newRow.appendChild(cell4)

      // Dodavanje novog reda u tabelu
      table.appendChild(newRow)
    })
  }
}

document.addEventListener('DOMContentLoaded', initialize)