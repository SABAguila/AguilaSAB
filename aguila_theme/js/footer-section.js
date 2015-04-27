function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function closeThisParent(e) {
    jQuery(e).parent().remove();
}

function onSubscriptionSubmit(event) {
    var _form = jQuery(event.target);
    var _inputEmail = _form.find('.form-text').val();
    var message;
    if(_form.find("div.errormsg").length>0) {
        message = jQuery(_form.find("div.errormsg")[0]);
    }else{
        message = jQuery('<div class="errormsg"/>');
        _form.append(message);
    }
    message.html("");
    
    if (_inputEmail=="") {
        _form.find('.form-text').addClass("error");
        message.html("Es necesario escribir una dirección de correo.");
    } else if (IsEmail(_inputEmail)) {
        jQuery.ajax({
            type:'post',
            url:_form.attr("action"),
            data:_form.serialize(),
            success: function() {
              //alert("Success");
              message = jQuery('<div class="alert alert-success"/>');
              message.html('<button type="button" class="close" aria-label="Close" onclick="closeThisParent(this)"><span aria-hidden="true">&times;</span></button> Gracias por registrarse!');
              message.insertBefore(_form);
              _form.remove();
            },
        });
    }else{
        //alert("Error");
        _form.find('.form-text').addClass("error");
        message.html("Correo incorrecto, por favor digite un correo válido.");
    }
    event.preventDefault();
}
    
    /*global jQuery2 */
(function ($) {
    // Transform Newsletter Form
    $.transform("#block-views-formulario-aguila-news-block-1", {
        target: "#web-form-aguila-news-container",
        type: 'append',
        globalTarget: true,
        afterEach: function ($, node) {
            node.find('input[type="text"]').attr('placeholder', 'Tucorreo@mail.com');
            node.find('form').submit(onSubscriptionSubmit);
            
        }
    });
    

}(jQuery2));

