/* global DATASLATE */
const { meta, briefing, district, evidence, contacts, notes: noteText, security } = DATASLATE;
const app = document.querySelector('#app');
const toast = document.querySelector('#toast');
const NOTES_KEY = `dataslate:${meta.id}:notes`;
const LOCK_KEY = `dataslate:${meta.id}:memory-wiped`;
const ACCESS_KEY = `dataslate:${meta.id}:authorised`;
const sections = ['briefing', 'district', 'evidence', 'contacts', 'notes'];

function escape(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}

function photo(item) {
  if (item.image) return `<img class="photo" src="${escape(item.image)}" alt="${escape(item.imageAlt || '')}">`;
  return `<div class="photo${item.mark ? ' photo--mark' : ''}" aria-label="${escape(item.imageAlt || '')}">${item.mark ? escape(item.mark) : `<span>${escape(item.imageLabel).replace(/\n/g, '<br>')}</span>`}</div>`;
}

function render() {
  document.title = meta.browserTitle;
  app.innerHTML = `
    <header class="masthead">
      <p class="eyebrow">${escape(meta.channel)}</p>
      <h1>${escape(meta.fileLabel)}: <span>${escape(meta.id)}</span></h1>
      <p class="clock">${escape(meta.date)}</p>
    </header>
    <nav class="tabs" aria-label="${escape(meta.tabsLabel)}">
      ${sections.map((section) => `<button class="tab" type="button" data-section="${section}">${escape(DATASLATE.tabs[section])}</button>`).join('')}
    </nav>
    <section class="panel" id="briefing" data-panel>
      <p class="status"><span></span>${escape(briefing.status)}</p><h2>${escape(briefing.title)}</h2>
      ${briefing.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join('')}
      <dl class="facts">${briefing.facts.map((fact) => `<div><dt>${escape(fact.label)}</dt><dd>${escape(fact.value)}</dd></div>`).join('')}</dl>
    </section>
    <section class="panel district" id="district" data-panel hidden>
      <p class="status"><span></span>${escape(district.status)}</p><h2>${escape(district.title)}</h2>
      <dl class="facts">${district.facts.map((fact) => `<div><dt>${escape(fact.label)}</dt><dd>${escape(fact.value)}</dd></div>`).join('')}</dl>
      ${district.sections.map((section) => `<article class="district-section"><h3>${escape(section.title)}</h3>${section.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join('')}</article>`).join('')}
    </section>
    <section class="panel" id="evidence" data-panel hidden>
      <p class="status"><span></span>${escape(evidence.status)}</p>
      ${evidence.items.map((item, index) => `<article class="record">${photo(item)}<div><p class="record-id">${escape(item.label || `${evidence.itemLabel} ${String(index + 1).padStart(2, '0')}`)}</p><h2>${escape(item.title)}</h2><p>${escape(item.text)}</p></div></article>`).join('')}
    </section>
    <section class="panel" id="contacts" data-panel hidden>
      <p class="status"><span></span>${escape(contacts.status)}</p>
      ${contacts.items.map((item, index) => `<article class="contact">${item.imageLabel || item.image ? photo(item) : ''}<div class="contact-body"><p class="record-id">${escape(item.label || `${contacts.itemLabel} ${String(index + 1).padStart(2, '0')}`)}</p><h2>${escape(item.name)}</h2>${item.address ? `<p class="address">${escape(item.address)}</p>` : ''}<p>${escape(item.text)}</p><button class="action" type="button" data-copy="${escape(item.copy || `${item.name} — ${item.text}`)}">${escape(contacts.copyButton)}</button></div></article>`).join('')}
    </section>
    <section class="panel" id="notes" data-panel hidden>
      <p class="status"><span></span>${escape(noteText.status)}</p>
      <label for="notes-field">${escape(noteText.label)} <span id="save-state">${escape(noteText.saved)}</span></label>
      <textarea id="notes-field" placeholder="${escape(noteText.placeholder)}" spellcheck="true"></textarea>
      <p class="hint">${escape(noteText.hint)}</p><button class="action action--danger" id="clear-notes" type="button">${escape(noteText.clearButton)}</button>
    </section>`;
}

function renderDestroyed() {
  app.innerHTML = `<section class="lock-screen"><p class="status status--danger"><span></span>${escape(security.lockedStatus)}</p><h1>${escape(security.lockedTitle)}</h1><p>${escape(security.lockedText)}</p></section>`;
}

function normalise(value) {
  return value.trim().toLocaleLowerCase('uk-UA').replace(/[’'ʼ\-\s]/g, '');
}

function renderUnlock() {
  app.innerHTML = `<section class="lock-screen"><p class="eyebrow">${escape(meta.channel)}</p><h1>${escape(meta.fileLabel)}: ${escape(meta.id)}</h1><p class="status"><span></span>П’ЯТИКЛАВІШНИЙ ЗАХИСТ АКТИВНИЙ</p><p>${escape(security.prompt)}</p><form id="unlock-form"><input id="access-code" type="password" autocomplete="off" autocapitalize="none" spellcheck="false" required><p class="warning">${escape(security.warning)}</p><button class="action" type="submit">${escape(security.unlockButton)}</button></form></section>`;
  document.querySelector('#unlock-form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (normalise(document.querySelector('#access-code').value) === normalise(security.codeWord)) {
      sessionStorage.setItem(ACCESS_KEY, '1');
      renderApp();
      showToast(security.unlocked);
    } else {
      localStorage.setItem(LOCK_KEY, '1');
      localStorage.removeItem(NOTES_KEY);
      renderDestroyed();
    }
  });
}

function renderApp() {
  render();
  bindApp();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('is-visible'), 1800);
}

function selectSection(name) {
  document.querySelectorAll('[data-section]').forEach((tab) => tab.classList.toggle('is-active', tab.dataset.section === name));
  document.querySelectorAll('[data-panel]').forEach((panel) => { panel.hidden = panel.id !== name; });
  history.replaceState(null, '', `#${name}`);
}

function bindApp() {
  document.querySelectorAll('[data-section]').forEach((tab) => tab.addEventListener('click', () => selectSection(tab.dataset.section)));
  selectSection(sections.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'briefing');
  const notes = document.querySelector('#notes-field');
  const saveState = document.querySelector('#save-state');
  notes.value = localStorage.getItem(NOTES_KEY) || '';
  notes.addEventListener('input', () => { localStorage.setItem(NOTES_KEY, notes.value); saveState.textContent = noteText.saved; });
  document.querySelector('#clear-notes').addEventListener('click', () => {
    if (!notes.value || confirm(noteText.clearConfirmation)) { notes.value = ''; localStorage.removeItem(NOTES_KEY); showToast(noteText.cleared); }
  });
  document.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(button.dataset.copy); showToast(contacts.copied); }
    catch { showToast(button.dataset.copy); }
  }));
}

if (localStorage.getItem(LOCK_KEY)) renderDestroyed();
else if (sessionStorage.getItem(ACCESS_KEY)) renderApp();
else renderUnlock();
