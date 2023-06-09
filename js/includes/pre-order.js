$(function() {

    "use strict";

    $('#next-personal').on('click', function() {
        $('#js-product-info').addClass('slide-out-left');
        $('#js-personal-info').addClass('slide-in-right');
    });
    $('#prev-product-info').on('click', function() {
        $('#js-personal-info').removeClass('slide-in-right');
        $('#js-product-info').removeClass('slide-out-left');
    });



    $.validator.setDefaults({
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorPlacement: function(error, element) {}
    });


    $("#preorderform").submit(function(e) {
        e.preventDefault();
    }).validate({
        rules: {},
        submitHandler: function(form) {

            $(".js-preorder-btn").attr("disabled", true);


            var redirect = $('#preorderform').data('redirect');
            var noredirect = false;
            if (redirect == 'none' || redirect == "" || redirect == null) {
                noredirect = true;
            }

            $(".js-preorder-btn").addClass('sending');

            var dataString = $(form).serialize();


            $.ajax({
                type: "POST",
                data: dataString,
                url: "php/pre-order.php",
                cache: false,
                success: function(d) {
                    $(".form-group").removeClass("has-success");
                    if (d == 'success') {

                        if (noredirect) {
                            setTimeout(function() {
                                $(".js-preorder-btn").removeClass('sending').addClass('is-success');
                                $(".js-preorder-btn span").html('<span class="checkmark"></span>');
                            }, 2000);

                        } else {
                            window.location.href = redirect;
                        }

                    } else {

                        setTimeout(function() {
                            $(".js-preorder-btn").removeClass('sending').addClass('is-failed');
                            $(".js-preorder-btn span").text('Error!');
                            console.log(d);
                        }, 2000);

                        setTimeout(function() {
                            $(".js-preorder-btn").removeClass('is-failed');
                            $(".js-preorder-btn span").html('<span>Finish Purchase</span>');
                            $(".js-preorder-btn").attr("disabled", false);
                        }, 4000);

                    }
                },
                error: function(d) {

                    setTimeout(function() {
                        $(".js-preorder-btn").removeClass('sending').addClass('is-failed');
                        $(".js-preorder-btn span").html('<span class="crossmark"></span>');
                        console.log(d);
                    }, 2000);

                    setTimeout(function() {
                        $(".js-preorder-btn").removeClass('is-failed');
                        $(".js-preorder-btn span").html('<span>Finish Purchase</span>');
                        $(".js-preorder-btn").attr("disabled", false);
                    }, 4000);



                }
            });
            return false;

        }
    });

})
