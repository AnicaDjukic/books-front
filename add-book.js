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

    fetch('http://localhost:63576/api/books', {
        method: 'POST',
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