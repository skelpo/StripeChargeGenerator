HTMLElement.prototype.addValueForKey = function (value, key) {
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', key);
  hiddenInput.setAttribute('value', value);
  this.appendChild(hiddenInput);
}

///===--------------------===
///
/// STRIPE CREDIT CARD FORM CONFIGURATION
///
////===--------------------===

const STRIPE_KEY = 'pk_test_TYooMQauvdEDq54NiTphI7jx';
var stripe = Stripe(STRIPE_KEY);
var elements = stripe.elements();

var style = {
    base: {
        // Add your base input styles here. For example:
        fontSize: '16px',
        color: "#32325d",
    }
    };

    // Create an instance of the card Element.
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');

    card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the customer that there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  });
});

function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');

    form.addValueForKey(token.id, 'stripeToken');
    form.addValueForKey('USD', 'currency');
    form.addValueForKey(3000, 'shipping');
    form.addValueForKey(1500, 'handling');
    form.addValueForKey(2000, 'insurence');

    // Submit the form
    form.submit();
}