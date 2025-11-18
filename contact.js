// Φόρτωση του layout
fetch('partials/layout.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('layout1').innerHTML = html;

    // Φόρτωση του layout JS
    const script = document.createElement('script');
    script.src = 'partials/layout_script.js';
    document.body.appendChild(script);

    // Εισαγωγή περιεχομένου Επικοινωνίας στο <main id="content">
    requestAnimationFrame(() => {
      const main = document.getElementById('content');
      main.innerHTML = `
        <section class="contact-info">
          <h2>Στοιχεία Επικοινωνίας</h2>
          <p>📍 Διεύθυνση: Λεωφόρος Παραδείσου 123, Αθήνα</p>
          <p>📞 Τηλέφωνο: <a href="tel:+302101234567">210 123 4567</a></p>
          <p>📧 Email: <a href="mailto:info@example.com">info@example.com</a></p>
        </section>

        <section class="hours">
          <h2>Ώρες Λειτουργίας</h2>
          <ul>
            <li>Δευτέρα - Παρασκευή: 09:00 - 17:00</li>
            <li>Σάββατο: 10:00 - 14:00</li>
            <li>Κυριακή: Κλειστά</li>
          </ul>
        </section>

        <section class="contact-form">
          <h2>Φόρμα Επικοινωνίας</h2>
          <form id="contactForm">
            <label for="name">Όνομα:</label>
            <input type="text" id="name" name="name" placeholder="Το όνομά σου" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Το email σου" required>

            <label for="message">Μήνυμα:</label>
            <textarea id="message" name="message" rows="5" placeholder="Γράψε το μήνυμά σου..." required></textarea>

            <button type="submit">Αποστολή</button>
          </form>
          <p id="formStatus" class="status"></p>
        </section>
      `;

      // Προσθήκη λογικής για τη φόρμα
      const form = document.getElementById('contactForm');
      const status = document.getElementById('formStatus');

      if (form) {
        form.addEventListener('submit', e => {
          e.preventDefault();
          status.textContent = "✅ Το μήνυμά σου στάλθηκε επιτυχώς!";
          status.style.color = "green";
          form.reset();
        });
      }
    });
  });
