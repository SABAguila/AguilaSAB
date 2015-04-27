/*global jQuery2 */
(function ($) {
    'use strict';

    var node = '.galeria-chicas-aguila',
        offset = 4,
        limit = offset,
        galleryItems = [],
        btnLoad,
        showAllAction = false; // Choose to make items show by batch or to show all items

    $.initModule(node, function ($, el) {
        galleryItems = $(el).find('.media-gallery-media .field-item');
        btnLoad = $(el).find('#galeria-chichas-aguila-loadmore');

        // Verify the Load More button is needed
        if (limit < $(galleryItems).length && $(btnLoad).length) {
            galleryItems.filter(':gt('+(limit-1)+')').hide();
            btnLoad.removeClass('hidden');

            limit = showAllAction ? galleryItems.length : offset;

            // Load More Button event
            btnLoad.on('click touch', 'a', function(e) {
                if (showAllAction) {
                    // Show all elements
                    galleryItems.fadeIn('fast');

                } else {
                    // Show the amount of items in the interval, based on offset size
                    limit += offset;
                    galleryItems.filter(':lt('+(limit)+')').fadeIn('fast');
                }

                // Remove the Load More button if all items have been loaded
                if (limit >= $(galleryItems).length) {
                    $(e.delegateTarget).addClass('hidden');
                }
                e.preventDefault();
            });
        }


    });
}(jQuery2));