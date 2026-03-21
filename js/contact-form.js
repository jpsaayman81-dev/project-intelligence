const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', handleSubmit);
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString()
  })
    .then(() => {
      document.getElementById('form-success').style.display = 'block';
      form.querySelectorAll('input, textarea, select, button').forEach(el => {
        el.disabled = true;
      });
    })
    .catch(() => {
      alert('Something went wrong — please email us directly at info@projectintelsa.co.za');
    });
}
