/*global jQuery2 */
(function ($) {
    $.transform('iframe.user[data-src]', {
        process: function ($, node) {
            var src = node.data('src'),
                parameters = $('.global-user-data').text() || '';

            if (parameters && parameters.length > 0) {
                src += (src.indexOf('?') >= 0 ? '&' : '?') + parameters;
            }

            node.attr('src', src).attr('scrolling', 'no');

            node.iFrameResize();
            return node;
        }
    });
}(jQuery2));