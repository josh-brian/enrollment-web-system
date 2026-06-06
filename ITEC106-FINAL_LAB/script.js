/* =============================================
   ENROLLMENT WEB SYSTEM — script.js
   ITEC 106 | Cavite State University Bacoor
   ============================================= */

/**
 * Formats the current date and time into a readable string.
 * Example output: "June 06, 2025 — 10:35:22 AM"
 */
function getCurrentTimestamp() {
  var now = new Date();

  var options = {
    year:   'numeric',
    month:  'long',
    day:    '2-digit',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };

  // Returns e.g. "June 06, 2025, 10:35:22 AM"
  // We clean it slightly for readability in the text file.
  return now.toLocaleString('en-US', options).replace(',', ' —');
}

/**
 * On form submit: fill the hidden datetime field with the
 * current timestamp BEFORE the data is sent to PHP.
 */
var form = document.getElementById('enrollmentForm');

form.addEventListener('submit', function (event) {
  var datetimeField = document.getElementById('datetime_submitted');
  datetimeField.value = getCurrentTimestamp();
  // Form submission continues normally to index.php via POST.
});
