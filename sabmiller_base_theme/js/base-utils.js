
(function ($) {

    // Append Viewport Metatag
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">');

    // Base Configuration for Responsive Navigation
    Drupal.navigation = {
        elements: [{
            target: '#block-system-main-menu .content',
            css: 'mobile-main-menu',
            configure: function (node) {
                node.find('li.expanded > ul.menu').removeAttr('style');
            }
        }],
        link: '#mobile-menu-action'
    };


    $(document).ready(function () {
        var body = $('body'),
            page = $('#page');

        // Avoid problems with empty sidebars and the height equalizer in Site Factory
        $('#sidebar-a, #sidebar-b').filter(function () {
            return $.trim($(this).text()) === '';
        }).remove();

        // Makes Sidebar B behave in a responsive way
        var sidebarB = $('#sidebar-b'),
            main,
            target,
            targetPosition,
            minWidth = Drupal.sidebarBreakpoint,
            mobile = false;

        if (sidebarB.length > 0 && minWidth > 0) {
            if (minWidth > 0) {
                main = $('#main');
                target = Drupal.sidebarTarget || main;
                targetPosition = Drupal.sidebarTargetPosition || 'after';

                function sidebarResize() {
                    var width = body.width(); //window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    if (width < minWidth && !mobile) {
                        mobile = true;
                        if (targetPosition === 'after') {
                            target.after(sidebarB);
                        } else {
                            target.before(sidebarB);
                        }
                        sidebarB.css('minHeight', '');
                    } else if (width >= minWidth && mobile) {
                        mobile = false;
                        main.before(sidebarB);
                    }
                }

                $(window).on('resize', sidebarResize);
                sidebarResize();
            }
        }



        // Navigation
        var nav = Drupal.navigation;
        if (nav && $(nav.link).length) {
            nav.slidebarPosition = $(nav.link).hasClass('sb-toggle-right') ? "right" : "left";
            var navSlidebarContainer = $('<div class="sb-slidebar sb-' + nav.slidebarPosition + '"></div>');
            $.each(nav.elements, function (index, el) {
                var clone = $(el.target).clone(el.cloneEvents);
                clone.removeAttr('id class');
                clone.addClass(el.css);
                if (el.configure) {
                    el.configure(clone);
                }
                navSlidebarContainer.append(clone);
            });
            navSlidebarContainer.insertAfter(page);
            $.slidebars();
        }



        // Global Support for Custom Background Images
        var bgFields = $('.field-name-field-bg-image'),
            bgFieldElement;
        if (bgFields.length > 0) {
            bgFieldElement = bgFields.first().find('img');
            if (bgFieldElement.length > 0) {
                page.css('backgroundImage', 'url(' + bgFieldElement.attr('src') + ')');
            } else {
                bgFieldElement = bgFields.first().find('a');
                if (bgFieldElement.length > 0) {
                    page.css('backgroundImage', 'url(' + bgFieldElement.attr('href') + ')');
                }
            }
            bgFields.remove();
        } else {
            page.addClass('bg-default');
        }

		//Search field button to Magnifying Glass
		$(".block-search .form-submit").val("").attr("alt","Buscar");
    });
})(jQuery2);