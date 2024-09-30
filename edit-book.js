function fetchData() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    fetch('http://localhost:63576/api/books/' + id)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(book => {
        console.log('Retrieved books:', book);
        document.getElementById('name').value = book.name;
        document.getElementById('author').value = book.author;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  fetchData();

function submit() {
    const name = document.getElementById('name').value;
    const author = document.getElementById('author').value;

    if (name === '' || author === '') {
        alert('Both fields are required!');
        return;
    }
    const formData = {
        name: name,
        author: author
    };

    console.log('Form submitted:', formData);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    fetch('http://localhost:63576/api/books/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data submitted successfully:', data);
            window.location.href = 'books.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

