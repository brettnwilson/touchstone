// shared.js — navigation + footer for all Touchstone pages

const WEB3FORMS_ACCESS_KEY = '2cf7fcd3-9450-4800-9ee0-3f156bcf5277E';

// Clickjacking protection (Frame-Busting)
if (window.top !== window.self) {
  window.top.location = window.self.location;
}

function renderNav(activePage) {
  const r = (activePage === 'services' || activePage === 'home') ? '../' : './';
  return `
  <nav class="main-nav">
    <div class="container">
      <div class="nav-inner">
        <a href="${r}home/" class="nav-logo">
          <img src="${r}Images/logo-color-transparent.png" alt="Touchstone Electrical Services">
          <span>Touchstone<br>Electrical</span>
        </a>

        <ul class="nav-links">
          <li><a href="${r}home/" ${activePage === 'home' ? 'class="active"' : ''}>Home</a></li>
          <li class="dropdown">
            <button>Services <span class="chevron">▾</span></button>
            <div class="dropdown-menu">
              <div class="dropdown-label">Residential</div>
              <a href="${r}services/switchboard.html">Switchboard Upgrades</a>
              <a href="${r}services/ev-chargers.html">EV Charger Installation</a>
              <a href="${r}services/residential.html">Residential Electrical</a>
              <hr>
              <div class="dropdown-label">Commercial</div>
              <a href="${r}services/commercial.html">Commercial Electrical</a>
            </div>
          </li>
          <li><a href="${activePage === 'home' ? '#portfolio' : `${r}home/#portfolio`}">Our Work</a></li>
          <li><a href="${activePage === 'home' || activePage === 'services' ? '#contact' : `${r}home/#contact`}">Contact</a></li>
        </ul>

        <div class="nav-cta-group">
          <a href="tel:0404078326" class="btn-call">📞 0404 078 326</a>
          <a href="${activePage === 'home' || activePage === 'services' ? '#contact' : `${r}home/#contact`}" class="btn-quote">Get a Free Quote</a>
        </div>

        <button class="hamburger" onclick="toggleMobile()" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <div class="mobile-menu" id="mobileMenu">
      <a href="${r}home/">Home</a>
      <a href="${r}services/switchboard.html" class="mobile-sub">Switchboard Upgrades</a>
      <a href="${r}services/ev-chargers.html" class="mobile-sub">EV Charger Installation</a>
      <a href="${r}services/residential.html" class="mobile-sub">Residential Electrical</a>
      <a href="${r}services/commercial.html" class="mobile-sub">Commercial Electrical</a>
      <a href="${activePage === 'home' ? '#portfolio' : `${r}home/#portfolio`}">Our Work</a>
      <a href="${activePage === 'home' || activePage === 'services' ? '#contact' : `${r}home/#contact`}">Contact</a>
      <a href="${activePage === 'home' || activePage === 'services' ? '#contact' : `${r}home/#contact`}" class="mobile-cta">Get a Free Quote</a>
    </div>
  </nav>`;
}

function renderFooter(root) {
  const r = root || './';
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="${r}Images/logo-color-transparent.png" alt="Touchstone Electrical Services">
          <p>Licensed electricians serving the Sydney Region and the Surrounding Suburbs.</p>
          <ul class="footer-contact-list">
            <li><span class="footer-icon">📞</span><a href="tel:0404078326">0404 078 326</a></li>
            <li><span class="footer-icon">✉</span><a href="mailto:admin@touchstoneelectrical.com.au">admin@touchstoneelectrical.com.au</a></li>
            <li><span class="footer-icon">📍</span>Sydney and Surrounding Areas</li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Services</h4>
          <ul class="footer-links">
            <li><a href="${r}services/switchboard.html">Switchboard Upgrades</a></li>
            <li><a href="${r}services/ev-chargers.html">EV Charger Installation</a></li>
            <li><a href="${r}services/residential.html">Residential Electrical</a></li>
            <li><a href="${r}services/commercial.html">Commercial Electrical</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Company</h4>
          <ul class="footer-links">
            <li><a href="${r}home/#portfolio">Our Work</a></li>
            <li><a href="${r}home/#testimonials">Reviews</a></li>
            <li><a href="${r}home/#contact">Contact</a></li>
            <li><a href="${r}privacy-policy.html">Privacy Policy</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Service Areas</h4>
          <ul class="footer-links">
            <li><a href="#">Parramatta</a></li>
            <li><a href="#">Blacktown</a></li>
            <li><a href="#">Liverpool</a></li>
            <li><a href="#">Penrith</a></li>
            <li><a href="#">Chatswood</a></li>
            <li><a href="#">Sutherland</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Touchstone Electrical Services. Licensed & Insured.</span>
      </div>
    </div>
  </footer>`;
}

function toggleMobile() {
  const m = document.getElementById('mobileMenu');
  m.classList.toggle('open');
}

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', initFAQ);

function sanitizeInput(value) {
  if (typeof value !== 'string') return '';
  return value
    .trim()
    .replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags to prevent XSS
}

function sanitizeForm(formElement) {
  if (!formElement) return;
  const inputs = formElement.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.value = sanitizeInput(input.value);
  });
}

// Centralized Asynchronous Form Submission using Web3Forms
async function handleFormSubmit(event, subjectText, successMessage) {
  event.preventDefault();
  const form = event.target;

  // Sanitize input fields
  sanitizeForm(form);

  // 1. Honeypot check for spam bots
  const botcheck = form.querySelector('[name="botcheck"]');
  if (botcheck && botcheck.checked) {
    console.warn('Spam injection blocked via botcheck honeypot.');
    form.reset();
    return false;
  }

  // 2. Strict Postcode Validation (Australian 4-digit postcodes)
  const postcodeInput = form.querySelector('[name="postcode"]');
  if (postcodeInput && postcodeInput.value) {
    const postcodeVal = postcodeInput.value.trim();
    const postcodeRegex = /^[0-9]{4}$/;
    if (!postcodeRegex.test(postcodeVal)) {
      alert('Please enter a valid 4-digit postcode (e.g. 2100).');
      postcodeInput.focus();
      return false;
    }
  }

  // 3. Strict Email Validation
  const emailInput = form.querySelector('[type="email"]');
  if (emailInput && emailInput.value) {
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      alert('Please enter a valid email address.');
      emailInput.focus();
      return false;
    }
  }

  // 4. Strict Phone Validation (8-15 digits, allowing standard punctuation)
  const phoneInput = form.querySelector('[type="tel"]');
  if (phoneInput && phoneInput.value) {
    const phoneVal = phoneInput.value.trim();
    const phoneRegex = /^\+?[0-9\s\-()]{8,15}$/;
    if (!phoneRegex.test(phoneVal)) {
      alert('Please enter a valid phone number.');
      phoneInput.focus();
      return false;
    }
  }

  const submitButton = form.querySelector('[type="submit"]');
  const originalBtnText = submitButton ? (submitButton.textContent || submitButton.value || 'Submit') : 'Submit';

  // Simulation Mode if Key is left as placeholder
  if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE' || !WEB3FORMS_ACCESS_KEY) {
    console.warn('Web3Forms Access Key is not configured. Form submission simulated.');
    alert(`${successMessage}\n\n[SIMULATION MODE: Set your Web3Forms Access Key in shared.js to receive actual emails]`);
    form.reset();
    return false;
  }

  try {
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', subjectText);
    formData.append('from_name', 'Touchstone Electrical Website');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      alert(successMessage);
      form.reset();
    } else {
      console.error('Web3Forms Submission Error:', result);
      alert('Something went wrong. Please try again or call us directly.');
    }
  } catch (error) {
    console.error('Form submission failed:', error);
    alert('Failed to send message. Please check your network connection and try again.');
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalBtnText;
    }
  }

  return false;
}

// Global Form Handlers
function handleQuickEnquiry(event) {
  handleFormSubmit(
    event,
    '⚡ Quick Enquiry Request',
    'Thank you for your enquiry. We will call you within 2 hours.'
  );
  return false;
}

// Needs to be exposed globally
window.handleQuickEnquiry = handleQuickEnquiry;

function handleContactForm(event) {
  handleFormSubmit(
    event,
    '✉ New Contact Message',
    'Thank you for your message. We will get back to you as soon as possible.'
  );
  return false;
}

window.handleContactForm = handleContactForm;

function handleServiceQuote(event) {
  const pageTitle = document.title.split('—')[0].trim();
  handleFormSubmit(
    event,
    `📋 Quote Request: ${pageTitle}`,
    'Thank you! We will call you shortly with a quote.'
  );
  return false;
}

window.handleServiceQuote = handleServiceQuote;

