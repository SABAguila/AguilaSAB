/*global jQuery2 */
(function ($) {
    $.transform('.node-media-gallery', {
        process: function ($, node) {
            node.find('.media-gallery-item').each(function () {
                var anchor = $(this).find('.media-gallery-thumb'),
                    image = anchor.find('img');
                anchor.attr('data-src', image.attr('src').replace('/media_gallery_thumbnail/', '/media_gallery_large/'));
                anchor.append($("<span class='overlay'>Ampliar Foto</span>"));
            });
        },
        after: function ($, node) {
            // start the lightbox
        }
    });
}(jQuery2));