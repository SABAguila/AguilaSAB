(function ($) {
    var enableSubmit = function() {
        jQuery2("#edit-submit").prop("disabled", false);
    };


    var addImageProfile = function() {
        var $el = jQuery(".image-widget-data");
        var $uploadBtn = $el.find("#edit-field-thumbnail-und-0-upload");
        if(!$uploadBtn.hasClass("wrapped") && !(!!$(".image-preview").find("img").length)){
            $uploadBtn.wrap('<span class="wrapper-input-load">Cambiar mi imagen</span>');
            $uploadBtn.addClass("wrapped");

            $el.before('<div class="image-preview"><image typeof="foaf:Image" src="http://aguila.sabmiller.acsitefactory.com/sites/g/files/ogq351/f/styles/thumbnail/public/default_images/profile.png?itok=-5ePDBQb" width="100" height="100"</div>');

            $uploadBtn.change(function(){
                jQuery("#edit-field-thumbnail-und-0-upload-button").addClass("visible");
                enableSubmit();
            });
        }
    };

    $.initModule("#user-register-form", function ($, el) {
        el.find("div:first").prepend("<div class='header-form'></div>");
        $("<p>Bienvenido a la tierra de la alegr&iacute;a</p>").appendTo(".header-form");
        el.find("#edit-field-thumbnail").appendTo(".header-form");

        addImageProfile();

        jQuery(document).ajaxComplete(function () {
            addImageProfile();
            enableSubmit();
        });
    });

    $.initModule("#edit-profile-user-profile-form", function ($, el) {
        el.find("div:first").prepend("<div class='header-form'></div>");
        $("<p>¡Hola " + $("#edit-field-first-name-und-0-value").val() + "!</p><p>Bienvenido a la tierra de la alegr&iacute;a</p>").appendTo(".header-form");
        el.find("#edit-field-thumbnail").appendTo(".header-form");
        addImageProfile(); //if user do not have photo
        
        $("#edit-actions--2").append($("<a href='/user/logout'>Cerrar Sesi&oacute;n</a>"));

        $("#edit-submit").prop("disabled","disabled");
        
        el.find("#edit-field-edad-und-0-value-datepicker-popup-0").bind("focus",enableSubmit);
        el.find(".form-text").bind("change keyup",enableSubmit);
        el.find(".form-select").bind("change",enableSubmit);
        

        jQuery(document).ajaxComplete(function () {
            addImageProfile();
        });

    });

    $.initModule(".profile", function ($, el) {
        el.prepend("<div class='header-form'></div>");
        $(".header-form").after("<h2>Perfil del Usuario</h2>");
         $("<p>¡Hola " + $(".field-name-field-first-name").find(".field-item").text() + "!</p><p>Bienvenido a la tierra de la alegr&iacute;a</p>").appendTo(".header-form");
        el.find(".field-name-field-thumbnail").appendTo(".header-form");

        el.append($("#edit-actions--2"));
        el.find("[type='submit']").hide();
        $("#edit-actions--2").append($(".tabs.primary").find("[href$='edit-profile']"));
        $("[href$='edit-profile']").text("Editar perfil");
        $("#edit-actions--2").append($(".tabs.primary").find("[href$='edit']"));
        $("[href$='edit']").text("Editar cuenta");
        $("#edit-actions--2").append($("<a href='/user/logout'>Cerrar Sesi&oacute;n</a>"));
    });        

}(jQuery2));