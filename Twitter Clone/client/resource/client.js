const form = document.querySelector('.mew-form');
const loading = document.querySelector('.loading');
const mewsElement = document.querySelector('.mews');
const API_URL = 'http://localhost:5000/mews';

// Getting all mews
listAllMews();

// Adding event listener
form.addEventListener('submit', async (event) => {
    // Otherwise it will reload
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('mew-form__name');
    const content = formData.get('mew-form__content');

    // Client side validation
    // if (name !== '' && content !== '')

    addLoader();

    const mew = {
        name,
        content,
    };

    await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mew),
    })
        .then((response) => response.json())
        .then((createdMew) => {
            console.log(createdMew);

            // Prepare UI
            // document.querySelector('#mew-form__name').value = '';
            // document.querySelector('#mew-form__content').value = '';
            // Build in function
            form.reset();

            // Again listing all
            listAllMews();
        })
        .catch((error) => console.log('Client side error'));
});

function addLoader() {
    form.classList.add('not-visible');
    loading.classList.remove('not-visible');
}

function addForm() {
    form.classList.remove('not-visible');
    loading.classList.add('not-visible');
}

async function listAllMews() {
    mewsElement.innerHTML = '';
    addLoader();
    await fetch(API_URL, {
        method: 'GET',
        mode: 'cors',
    })
        .then((response) => response.json())
        .then((mews) => {
            console.log(mews);
            mews.reverse();
            let markup = '';
            mews.forEach((mew) => {
                markup += `
            <div>
                <h3>
                    ${mew.name}
                </h3>
                <p>
                    ${mew.content}
                </p>
                <small>
                    ${mew.created}
                </small>
            </div>
            `;

                const div = document.createElement('div');
                const heading = document.createElement('h3');
                heading.textContent = mew.name;

                const para = document.createElement('p');
                para.textContent = mew.content;

                const date = document.createElement('small');
                date.textContent = new Date(mew.created);

                div.appendChild(heading);
                div.appendChild(para);
                div.appendChild(date);

                // mewsElement.insertAdjacentElement('afterbegin',div);
                // mewsElement.appendChild(div);
            });
            mewsElement.insertAdjacentHTML('beforeend', markup);
            addForm();
        });
}
