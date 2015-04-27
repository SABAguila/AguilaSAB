/*global jQuery, jQuery2 */
(function ($) {
    $.fn.transform = function (options) {
        var source = $(this),
            targetQuery = options.target,
            globalTarget = !!options.globalTarget,
            type;

        options = options || {};
        type = options.type;

        function processNodes(callback) {
            source.each(function () {
                var node = $(this),
                    result = node,
                    target = targetQuery ? (globalTarget ? $(targetQuery) : node.sfind(targetQuery)) : node;

                if (options.beforeEach) {
                    options.beforeEach($, node, options);
                }

                if (options.process) {
                    result = options.process($, node, target, options, source);
                }

                callback(result, target, node);

                if (options.afterEach) {
                    options.afterEach($, result, target, node, options);
                }
            });
        }

        if (options.before) {
            options.before($, source, options);
        }

        if (type === 'delete') {
            options.remove = true;
        } else if (type === 'hide') {
            options.hide = true;
        } else if (type === 'replace') {
            processNodes(function (result, target) {
                target.html(result);
            });
        } else if (type === 'after') {
            processNodes(function (result, target) {
                target.after(result);
            });
        } else if (type === 'before') {
            processNodes(function (result, target) {
                target.before(result);
            });
        } else if (type === 'append') {
            processNodes(function (result, target) {
                target.append(result);
            });
        } else if (type === 'prepend') {
            processNodes(function (result, target) {
                target.prepend(result);
            });
        } else if (type === 'wrap') {
            processNodes(function (result, target) {
                target.wrap(result);
            });
        } else {
            processNodes(function () {});
        }

        if (options.hide) {
            source.hide();
        }

        if (options.remove) {
            source.remove();
        }

        if (options.after) {
            options.after($, source, options);
        }

        return this; // make it chainable
    };

    $.transform = function (selector, options) {
        var nodes = $(selector);
        if (nodes.length > 0) {
            nodes.transform(options);
        }
    };
}(jQuery2));