(function ($, jq) {
    $.fn.etarget = function (type, destination, filter) {
        this.on(type, function (e) {
            var target = jq(destination);
            e.preventDefault();
            e.stopPropagation();
            if (filter) {
                target = filter(e, target, jq);
            }
            target.trigger(type);
        });

        return this; // make it chainable
    };
})(jQuery2, jQuery);