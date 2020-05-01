const form = document.querySelector('.mew-form');
const loading = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/mews';

// Adding event listener
form.addEventListener('submit', (event) => {
    // Otherwise it will reload
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('mew-form__name');
    const content = formData.get('mew-form__content');

    if (name !== '' && content !== '') {
        // Prepare UI
        document.querySelector('#mew-form__name').value = '';
        document.querySelector('#mew-form__content').value = '';

        form.classList.add('not-visible');
        loading.classList.remove('not-visible');

        const mew = {
            name,
            content,
        };

        fetch(API_URL, {
            method: 'POST',
            mode: 'cors',
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mew),
        });

        form.classList.remove('not-visible');
        loading.classList.add('not-visible');
    }
});
