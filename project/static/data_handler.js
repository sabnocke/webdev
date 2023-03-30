const form = document.querySelector('#new-event-form')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);

    fetch('/create_event', {
        method: 'POST',
        body: data
    })
    .then(response => response.json)
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error(error);
    });
});