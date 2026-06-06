//Get current date and time
function getCurrentTimestamp() {
  const now = new Date();

  const options = {
    year:   'numeric',
    month:  'long',
    day:    '2-digit',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };

  return now.toLocaleString('en-US', options).replace(',', ' —');
}

//Submit form data to php
async function submitForm(formData) {
  try {
    const response = await fetch("process.php", {
      method: "POST",
      body: formData
    });

    if(!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.text();
    console.log('Server response:', result);
    return result.trim();
  } catch (error) {
    throw error;
  }
}

//Validate form data before submission
function isInputValid(){
  const age = document.getElementById('age');
  const units_last_sem = document.getElementById('units_last_sem');
  const section = document.getElementById('section');
  const sectionPattern = /^[A-Z]+\s[\d]-[\d]+$/;

  if(age.value < 15 || age.value > 100) {
    alert('Please enter a valid age.');
    age.classList.add('input-error');
    return false;
  } else {
    age.classList.remove('input-error');
  }

  if(units_last_sem.value < 0) {
    alert('Please enter a valid number of units. Units cannot be negative.');
    units_last_sem.classList.add('input-error');
    return false;
  } else {
    units_last_sem.classList.remove('input-error');
  }

  if(!sectionPattern.test(section.value)) {
    alert('Please enter a valid section format (e.g., "BSIT 1-1").');
    section.classList.add('input-error');
    return false;
  } else {
    section.classList.remove('input-error');
  }

  return true;
}

const form = document.getElementById('enrollmentForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  //if input is invalid, don't submit
  if(!isInputValid()) {
    return;
  }

  const datetimeField = document.getElementById('datetime_submitted');
  datetimeField.value = getCurrentTimestamp();

  const formData = new FormData(form);

  const result = await submitForm(formData);
  console.log('Form submission result:', result);

  if(result === "Success") {
    alert('Enrollment information submitted successfully!');
    form.reset();
  } else {
    console.error('Submission failed:', result);
    alert('Failed to submit enrollment information. Please try again.');
  }

});

form.addEventListener('reset', () => {
  const errorFields = form.querySelectorAll('.input-error');
  errorFields.forEach(field => field.classList.remove('input-error'));
});