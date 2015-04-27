(function ($) {
    $.fn.sfind = function (selector) {
        var parts,
            result = this;

        if (selector) {
            parts = selector.split('^');
            if (parts.length > 1) {
                result = this.closest(parts[0]).find(parts[1]);
            } else {
                result = this.find(parts[0]);
            }
        }

        return result;
    };
})(jQuery2);