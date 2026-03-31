const sb = window.supabase
  ? window.supabase.createClient(
      'https://xqnmeqymkuuqozyfiakj.supabase.co',
      'sb_publishable_HcbpsTkAY514azMuUoAizA_uyPtKU9H'
    )
  : null;

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
    const data = new FormData(contactForm);

    // Save to Supabase
    if (sb) {
      sb.from('enquiries').insert({
        first_name: data.get('first-name') || null,
        last_name:  data.get('last-name')  || null,
        email:      data.get('email')      || null,
        organisation: data.get('organisation') || null,
        role:       data.get('role')       || null,
        message:    data.get('message')    || null,
        source:     'website'
      });
    }

    // Also send to Netlify
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
