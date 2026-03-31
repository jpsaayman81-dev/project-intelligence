function netlifySubmit(form, onSuccess) {
  const data = new FormData(form);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString()
  })
    .then(onSuccess)
    .catch(() => {
      alert('Something went wrong — please email us directly at info@projectintelsa.co.za');
    });
}

// Enquiry / contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    netlifySubmit(contactForm, () => {
      document.getElementById('form-success').style.display = 'block';
      contactForm.querySelectorAll('input, textarea, select, button').forEach(el => {
        el.disabled = true;
      });
    });
  });
}

// Trial registration form
const trialForm = document.querySelector('.tech-form');
if (trialForm) {
  trialForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = trialForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Registering...';
    netlifySubmit(trialForm, () => {
      trialForm.style.display = 'none';
      document.getElementById('trial-success').style.display = 'block';
    });
  });
}
