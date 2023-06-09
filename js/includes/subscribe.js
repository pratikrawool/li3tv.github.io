$(function() {

    "use strict";


    $.validator.setDefaults({
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'p',
        errorClass: 'help-block text-danger',
        errorPlacement: function(error, element) {
            if (element.parent('.input-group').length) {
                element.parent().addClass('animated shake');
                setTimeout(function() {
                    element.parent().removeClass('animated shake');
                }, 1000);

            } else if (element.parent('label').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });


    $("#subscribeform").submit(function(e) {
        e.preventDefault();
    }).validate({
        rules: {
			
            email: {
                required: true,
                email: true
            }
        },
        messages: {

            email: "Please enter your email address"
        },
        submitHandler: function(form) {

            $("#js-subscribe-btn").attr("disabled", true);


            var redirect = $('#subscribeform').data('redirect');
            var noredirect = false;
            if (redirect == 'none' || redirect == "" || redirect == null) {
                noredirect = true;
            }

            $("#js-subscribe-result").fadeIn("slow").html('<p class="help-block">Please wait...</p>');


            var success_msg = $('#js-subscribe-result').data('success-msg');
            var error_msg = $('#js-subscribe-result').data('error-msg');

            var dataString = $(form).serialize();


            $.ajax({
                type: "POST",
                data: dataString,
                url: "php/subscribe.php",
                cache: false,
                success: function(d) {
                    $(".form-group").removeClass("has-success");
                    if (d == 'success') {
                        if (noredirect) {
                            $('#js-subscribe-result').fadeIn('slow').html('<p class="help-block text-success">' + success_msg + '</p>').delay(3000).fadeOut('slow');
                        } else {
                            window.location.href = redirect;
                        }
                    } else {
                        $('#js-subscribe-result').fadeIn('slow').html('<p class="help-block text-danger">' + error_msg + '</p>').delay(3000).fadeOut('slow');
                        console.log(d);
                    }
                    $("#js-subscribe-btn").attr("disabled", false);
                },
                error: function(d) {
                    $('#js-subscribe-result').fadeIn('slow').html('<p class="help-block text-danger"> Sorry. Cannot access the PHP Server</p>').delay(3000).fadeOut('slow');
                    $("#js-subscribe-btn").attr("disabled", false);
                }
            });
            return false;

        }
    });

});
