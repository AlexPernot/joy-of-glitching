const fileInput = document.getElementById('file');
const form = document.getElementById('form');
const submitButton = document.getElementById('submit');
const img = document.getElementById('result-img');

fileInput.addEventListener('change', e => {
    if (e.target.value) {
        submitButton.removeAttribute('disabled');
    }
    else
    {
        submitButton.setAttribute('disabled', '');
    }
});

form.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch('/glitch', {
        method: "post",
        body: formData
    })
        .then(res => res.text())
        .then(data => {
            img.src = data;
            img.style.display = 'block';
        })
});