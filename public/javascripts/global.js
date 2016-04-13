$(document).ready(function() {

console.log('hello')

// Functions =============================================================


$('.form-group').on('click', function(){
  console.log('yo')
})






function ajaxFunction(){


$.ajax({
      url: ('http://cors.io/?u=https://www.google.com/recaptcha/api/siteverify'),
      type: 'GET',
      dataType: 'json',
      success: function(response) {
        if (response.success) {

        } else {

        }
        storeResponse = response;
        console.log(storeResponse)
      }
    })
  };
})
