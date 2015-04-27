/*global jQuery2, moment*/
(function ($) {
    var viewDestacados = $(".front .destacados-principal"),
        destacadosClickableOverlay = '.views-row-2, .views-row-3',
        destacados = [];

    $(".destacados-principal .views-row-1 .views-field-nothing a").addClass("btn btn-strong");
    $(".destacados-principal .views-row-6 .views-field-nothing a").addClass("btn btn-strong");
    if (viewDestacados.length) {
        destacados = viewDestacados.find('.views-row');

        destacados.each(function () {
            var nodeDate = $(this).find('.views-field-created span.field-content'),
                publishDate = moment($.trim(nodeDate.text()), "YYYY-MM-DD"),
                numDays;

            //Set time in days.
            numDays = moment().diff(publishDate, 'days');
            nodeDate.text((numDays === 0 ? "Hoy" : "Hace " + numDays + " día" + (numDays === 1 ? "" :  "s")));
            nodeDate.addClass('show');

            //Add arrow
            $(this).find(".views-field-field-thumbnail").append(
                '<div class="views-field views-field-arrow"><span class="arrow"></span></div>'+
                '<div class="views-field views-field-overlay"></div>');
        });

        $(destacados).filter(destacadosClickableOverlay).on('click touch', '.views-field-field-thumbnail .views-field-overlay', function(e) {
            $(e.delegateTarget).find('.views-field-field-thumbnail .field-content a')[0].click();
        });
    }
}(jQuery2));