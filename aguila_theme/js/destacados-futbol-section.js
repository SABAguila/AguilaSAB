/*global jQuery2, jQuery, document, moment */
(function ($, jq) {

    function transformar() {
        var viewFutbol = $(".destacados-futbol"),
            loadMore = viewFutbol.find('.pager-load-more');

        viewFutbol.find('.view-content .item-list li.views-row:not(.transformado)').each(function (index) {
            var el = $(this),
                i = index + 1,
                nodeDate = $(this).find('.views-field-created span.field-content'),
                publishDate = moment($.trim(nodeDate.text()), "YYYY-MM-DD"),
                numDays;

            //Set time in days.
            numDays = moment().diff(publishDate, 'days');
            nodeDate.text((numDays === 0 ? "Hoy" : "Hace " + numDays + " día" + (numDays === 1 ? "" :  "s")));
            nodeDate.addClass('show');

            //Add arrow
            $(this).find(".views-field-field-thumbnail").append('<div class="views-field views-field-arrow"><span class="arrow"></span></div>');

            //Set the background color for each categoria element.
            $(this).find("span.btn.categoria").addClass('btn-red');

            el.addClass('transformado');

            if (!el.hasClass(('views-row-' + i))) {
                el.addClass('views-row-' + i);
            }
        });

        //Hide Btn if don't have more items.
        if (loadMore.find('a').length === 0) {
            loadMore.parent().addClass('hide');
        }
    }

    $.initModule('.destacados-futbol', function () {
        transformar();
        jq(document).ajaxComplete(function () {
            setTimeout(transformar, 50);
        });
    });
}(jQuery2, jQuery));