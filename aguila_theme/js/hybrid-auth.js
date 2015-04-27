//page-hybridauth
/*global jQuery2 */
(function ($) {

    $.initModule(".page-hybridauth-window-twitter", function ($, page) {

        $("span.fieldset-legend").html("Información adicional requerida");
    
        $("#hybridauth-additional-info-form").validate({
        rules: {
            email: {
                email: true,
            }
        } 
        });
        
        $.extend($.validator.messages, {
          required: 'Este campo es obligatorio.',
          email: "Email inválido",
        });

        $("#edit-submit").removeClass("form-submit").addClass("btn btn-sky-blue btn-strong");
        
    });

    
}(jQuery2));

