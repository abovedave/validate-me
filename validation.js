// Get all the forms with the given class
var forms = document.querySelectorAll('.js-validate-form');

// Loop over each form
for (x = 0; x < forms.length; ++x) {  
  // This form instance
  var form = forms[x];
  
  // Find submit button
  var button = forms[x].querySelectorAll('.js-validate-submit')[0];

  // Disable browser validation
  form.setAttribute('novalidate', 'novalidate');
  
  // Disable submit button
  button.disabled = true;

  // Disable default events
  var allowSubmit = false;

  // Inputs to validate
  var inputs = form.querySelectorAll('.js-validate-field');

  // Loop over each input, add a <span> to hold error messages
  for (y = 0; y < inputs.length; ++y) {
    var el = document.createElement('span');
    el.setAttribute('aria-live', 'polite');
    el.classList.add('fm', 'js-hint', 'js-hide');
    inputs[y].parentNode.appendChild(el);
  }

  // When something happens
  var inputUpdated = function (event) {
    for (y = 0; y < inputs.length; ++y) {
      // Add custom validation
      fieldMessage(inputs[y], event);

      // Enable sumbit button if all fields valid
      if (inputs[y].checkValidity()) {
        form.classList.add('js-valid');
        form.classList.remove('js-invalid');
        button.disabled = false;
      } else {
        form.classList.add('js-invalid');
        form.classList.remove('js-valid');
        button.disabled = true;
        break;
      }
    }
  }

  inputUpdated();

  // On field events, validate fields
  form.addEventListener('input', inputUpdated);
  form.addEventListener('change', inputUpdated);
}

// Handle the field message to the user
function fieldMessage (field, event) {
  // Error message
  var msg = field.getAttribute('title') || 'This field is not valid';

  // Checkbox validation
  if (field.getAttribute('type') === 'checkbox') {
    if (!field.checked) {
      return field.setCustomValidity('checkbox error');
    } else {
      return field.setCustomValidity(''); // :valid
    }
  }

  // Find the error span added previously
  var err = field.parentNode.querySelectorAll('.js-hint')[0];
 
  // Instances where we need to compare two fields
  var sameAs = document.getElementById(field.getAttribute('data-same-as'));
  var isValid = sameAs ? (field.value === sameAs.value) : field.checkValidity();

  if (sameAs && !isValid) {
    field.setCustomValidity(msg);
  } else {
    field.setCustomValidity(''); // :valid
  }

  // Enble any fields which are dependant on this being filled
  var child = document.getElementById(field.getAttribute('data-child'));

  if (child && field.value) {
    child.disabled = false;
  } else if (child) {
    child.value = '';
    child.disabled = true;
  }

  // Append error message
  if (
    field.value.length > 0 &&
    !isValid
  ) {
    field.parentNode.classList.add('has-error');
    err.innerHTML = msg;
    err.classList.remove('js-hide');
  }

  // Hide error stuff if valid
  if (isValid) {
    field.parentNode.classList.remove('has-error');
    err.classList.add('js-hide');
  }
}
