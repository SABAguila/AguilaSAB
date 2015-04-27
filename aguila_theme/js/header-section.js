/*global jQuery2 */
(function ($) {

    var btn;
    
    // Transform login Block;
    $.transform("#block-system-user-menu", {
        target: ".btn-login-search .btn-icon-login",
        type: 'append',
        globalTarget: true
    });

    // Transform Search Block
    $.transform("#block-search-form", {
        target: ".btn-login-search .btn-icon-search",
        type: 'append',
        globalTarget: true
    });
    
    $.initModule(".btn-login-search .btn-icon-search > a", function ($, searchBtn) {
        btn = $("<input id='closeSearchBtn' type='button' value='&#57364;' class='form-submit' />");
        btn.click(function() {
            jQuery("#block-search-form").css("display","none");
        });
        $("#edit-search-block-form--2").before(btn);
        searchBtn.hover(function() {
            jQuery("#closeSearchBtn").val("")
            jQuery("#block-search-form").css("display","block");
        });
        
        if ($(".userdata .userdata-username").html()) {
            $(".btn-login-search .btn-icon-login").addClass("user-logged").children("a").html( $(".userdata .userdata-username").html() ).mouseover(function() { jQuery("#block-search-form").css("display","none"); });
        }
    });
}(jQuery2));

