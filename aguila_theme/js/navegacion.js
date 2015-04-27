/*global jQuery2 */
(function ($) {

    $('.menu a:contains("Cervezas")').attr("href","#");
    $('.menu .menu-link-3686 ul li.active-trail ').removeClass("active-trail");

    function setActive() {
        var menuItems = $('#block-system-main-menu ul.menu > li > a'),
            active = menuItems.filter('.active'),
            seccion;

        if (active.length === 0) {
            seccion = $('.view-seccion-navegacion .global-seccion').text();

            if (seccion && seccion !== '') {
                seccion = seccion.toLowerCase();

                if (seccion.indexOf('ruta') >= 0) {
                    active = menuItems.filter('[href="/ferias-y-fiestas"]');
                } else if (seccion.indexOf('en vivo') >= 0) {
                    active = menuItems.filter('[href="/aguila-en-vivo"]');
                } else if ((seccion.indexOf('futbol') >= 0) || (seccion.indexOf('fútbol') >= 0)) {
                    active = menuItems.filter('[href="/fubtol"]');
                } else if (seccion.indexOf('chicas') >= 0) {
                    active = menuItems.filter('[href="/chicas-aguila"]');
                } else if (seccion.indexOf('cerveza') >= 0) {
                    active = menuItems.filter('[href^="/cerveza/"]');
                }

                active.first().addClass('active').parent().addClass('active-trail');
            }
        }
    }

    function adjust() {
        var header = $('.site-name-wrapper.center'),
            items = $("#block-system-main-menu .content>ul>li"),
            menu = $('#block-system-main-menu'),
            count = items.length,
            center = Math.ceil(count/2)-1;

        if ( $("#block-system-main-menu .site-name-wrapper").length==0 ) {
            $(items[center]).after( header );
            header.wrap("<li></li>");
        }

        if (menu.is(':visible')) {
            var offset = $("#block-system-main-menu").width()/2-header.width()/2-header.parent().position().left,
                offset_slice = Math.round(offset/(center+1)/2);
            for(var i=0; i<=center; i++) {
                var currentPadding = parseInt( $(items[i]).find("a").css("padding-right") );
                currentPadding += offset_slice;
                $(items[i]).children("a").css("padding-left", currentPadding)
                $(items[i]).children("a").css("padding-right", currentPadding)
            }
            for(var i=center+1; i<count; i++) {
                currentPadding = parseInt( $(items[i]).find("a").css("padding-right") );
                currentPadding += offset_slice;
                $(items[i]).children("a").css("padding-left", currentPadding)
                $(items[i]).children("a").css("padding-right", currentPadding)
            }
        }
    }


    setActive();

    if (typeof $.ogSlidebars == "undefined") {
        $.ogSlidebars = $.slidebars;
        $.slidebars = function (options) {
            jQuery2("#navigation").addClass("sb-slide");
            jQuery2.ogSlidebars(options);
            jQuery2(".sb-slidebar").prepend( jQuery2('#header-region .site-name-wrapper').clone() );
            jQuery2('#header-region .site-name-wrapper').addClass("center");
            adjust();
        }
    }

    $(document).ready(adjust);
    $(window).on('load', adjust);
    $(window).on('resize', adjust);

}(jQuery2));