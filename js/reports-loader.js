// ─────────────────────────────────────────────────────────
// DYNAMIC REPORTS LOADER — reads reports.json
// To add a new brief or note: edit reports.json only.
// No HTML changes needed. Re-upload reports.json to Netlify.
// ─────────────────────────────────────────────────────────
(async function loadReports() {
  let data;
  try {
    const res = await fetch('reports.json?v=' + Date.now());
    data = await res.json();
  } catch (e) {
    console.warn('reports.json not found — using fallback empty state');
    return;
  }

  // ── BRIEFS SECTION ────────────────────────────────────
  const pubGrid = document.getElementById('pub-grid');
  if (pubGrid && data.briefs) {
    let html = '';

    const published = data.briefs.filter(b => b.status === 'published');
    published.forEach((b, i) => {
      const delay = i === 0 ? '' : ` reveal-delay-${i}`;
      const tags = (b.tags || []).map(t => `<span class="pub-tag">${t}</span>`).join('');
      const highlights = (b.highlights || []).map(h => `<li>${h}</li>`).join('');
      const dlBtn = b.file
        ? `<a href="${b.file}" class="pub-download" target="_blank">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
             Download Brief
           </a>`
        : `<a href="#contact" class="pub-download">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
             Request This Brief
           </a>`;

      if (i === 0) {
        html += `<div class="pub-card featured reveal${delay}">
          <div class="pub-left">
            <div class="pub-issue">${b.issue}</div>
            <h3 class="pub-title">${b.title}</h3>
            <p class="pub-subtitle">${b.subtitle}</p>
            <div class="pub-meta">
              <span class="pub-date">${b.date}</span>
              <div class="pub-tags">${tags}</div>
            </div>
          </div>
          <div class="pub-right">
            <ul class="pub-highlights">${highlights}</ul>
            ${dlBtn}
          </div>
        </div>`;
      } else {
        html += `<div class="pub-card reveal${delay}">
          <div class="pub-issue">${b.issue}</div>
          <h3 class="pub-title">${b.title}</h3>
          <p class="pub-subtitle">${b.subtitle}</p>
          <div class="pub-meta">
            <span class="pub-date">${b.date}</span>
            <div class="pub-tags">${tags}</div>
          </div>
          ${dlBtn}
        </div>`;
      }
    });

    (data.upcoming_briefs || []).forEach((b, i) => {
      const delay = ` reveal-delay-${i + 1}`;
      const tags = (b.tags || []).map(t => `<span class="pub-tag">${t}</span>`).join('');
      html += `<div class="pub-card soon reveal${delay}">
        <div class="soon-badge">Upcoming</div>
        <div class="pub-issue">${b.issue}</div>
        <h3 class="pub-title">${b.title}</h3>
        <p class="pub-subtitle">${b.subtitle}</p>
        <div class="pub-meta"><span class="pub-date">${b.date}</span><div class="pub-tags">${tags}</div></div>
      </div>`;
    });

    pubGrid.innerHTML = html;
  }

  // ── INTELLIGENCE NOTES / REPORTS SECTION ─────────────
  const repGrid = document.getElementById('reports-grid');
  if (repGrid && data.intelligence_notes) {
    let html = '';
    data.intelligence_notes.forEach((n, i) => {
      const delay = i === 0 ? '' : ` reveal-delay-${i}`;
      const isForthcoming = n.status === 'forthcoming';
      const dlOrRequest = n.file
        ? `<a href="${n.file}" class="report-link" target="_blank">Download</a>`
        : n.status === 'published'
          ? `<a href="#contact" class="report-link">Request</a>`
          : '';

      html += `<div class="report-card${isForthcoming ? ' upcoming' : ''} reveal${delay}">
        ${isForthcoming && n.forthcoming_label ? `<div class="report-upcoming-badge">${n.forthcoming_label}</div>` : ''}
        <div class="report-series">${n.series}</div>
        <span class="report-type">${n.type}</span>
        <h3 class="report-title">${n.title}</h3>
        <p class="report-desc">${n.desc}</p>
        <div class="report-footer">
          <span class="report-date">${n.date}</span>
          ${dlOrRequest}
        </div>
      </div>`;
    });
    repGrid.innerHTML = html;
  }

  // Re-trigger reveal animations for dynamically inserted cards
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) el.classList.add('revealed');
    });
  }, 100);

})();
