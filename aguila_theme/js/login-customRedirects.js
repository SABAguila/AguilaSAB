/*global jQuery */
(function ($) {
    var $pageUserLogin = $(".page-user-login");
    var $forgotPass = $pageUserLogin.find(".form-item-pass").find(".description").find("a");

    $forgotPass.unbind("click");
    $forgotPass.removeClass("use-ajax use-dialog ajax-processed use-dialog-processed");
    $forgotPass.attr("href", "/user/password");

}(jQuery));