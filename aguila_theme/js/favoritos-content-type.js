/*global jQuery, jQuery2 
(function ($, jq) {
    var destacados = $('.destacados-principal'),
        markup;

    $.transform('.favoritos-content-type', {
        type: 'replace',
        process: function ($, container) {
            var fav = $('.node-flag-counter'),
                anchor = fav.find('a'),
                node,
                wrapper;

            if (anchor.length > 0) {
                node = $('<span class="flag-wrapper" />');
                node.append(anchor.clone(true));
            } else {
                node = $('<span class="flag-wrapper" />');
                node.append('<a href="/user/login" class="flag flag-action flag-link-toggle">' + fav.find('.counter-summary').text() + '</a>');
            }

            wrapper = $('<span class="favoritos-content-type-wrapper" />');
            //Add span with the flag.
            wrapper.append(node);
            //Add span with the counter.
            wrapper.append('<span class="flag-counter">' + fav.find('.counter-summary').text() + '</span>');

            return wrapper;
        }
    });

    //Add link to login for favorites.
    if (destacados.length > 0) {
        destacados.find('.views-row').each(function () {
            if ($(this).find('.views-field-ops').length === 0) {
                markup  = '<div class="views-field views-field-ops">';
                markup += '<span class="field-content">';
                markup += '<span class="flag-wrapper flag-favoritos">';
                markup += '<a href="/user/login" class="flag flag-action flag-link-toggle"></a>';
                markup += '</span>';
                markup += '</span>';
                markup += '</div>';
                $(this).find('.views-field-created').after(markup);
            }
        });
    }
}(jQuery2, jQuery));*/