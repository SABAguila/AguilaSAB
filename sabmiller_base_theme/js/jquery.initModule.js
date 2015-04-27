(function ($) {
    $.initModule = function (selector, timeout, callback) {
        if (typeof timeout === 'function') {
            callback = timeout;
            timeout = null;
        }

        function execute() {
            $(selector).each(function () {
                callback($, $(this));
            });
        }

        if (timeout) {
            setTimeout(execute, timeout);
        } else {
            execute();
        }
    };
})(jQuery2);