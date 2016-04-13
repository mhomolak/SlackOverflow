$(document).ready(function() {

console.log('hello')

// Functions =============================================================





$.ajax({
      url: ('https://www.google.com/recaptcha/api/siteverify'),
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        storeResponse = response;
        console.log(storeResponse)
      }
    })
  })
