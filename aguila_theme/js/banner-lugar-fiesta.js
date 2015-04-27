/*global jQuery2 */
(function ($) {
    $.initModule('.banner-lugar-fiesta', function ($, banner) {
        var bg = banner.find('.banner-background a'),
            shareLinks = banner.find('.compartir a');

        if (bg.length > 0) {
            banner.css('backgroundImage', 'url(' + bg.attr('href') + ')');
        }

        shareLinks.on('click', function (e) {
            e.preventDefault();
            window.open($(this).attr('href'), '_blank', 'width=600,height=350');
        });
    });
}(jQuery2));