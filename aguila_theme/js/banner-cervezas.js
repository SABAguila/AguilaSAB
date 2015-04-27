/*global jQuery2 */
(function ($) {
    var node = '.banner-cerveza';

    $.initModule(node, function ($, el) {
        var bgNode = el.find('.views-field.views-field-field-cerveza-imagen-fondo'),
        	shareLinks = el.find('.compartir a');
        if($(bgNode).length) {
            el.css('backgroundImage', 'url(' + bgNode.find('img').attr('src') + ')');
            bgNode.find('img').remove();
        }

        shareLinks.on('click', function (e) {
            e.preventDefault();
            window.open($(this).attr('href'), '_blank', 'width=600,height=350');
        });
    });

}(jQuery2));