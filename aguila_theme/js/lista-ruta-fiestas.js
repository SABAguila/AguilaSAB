/*global jQuery2, jQuery, document */
(function ($, jq) {

    function transformar() {
        // no se puede utilizar la referencia a la lista porque el nodo en el DOM cambia
        $('.lista-ruta-fiestas').find('.view-content > .item-list > ul > li.views-row:not(.transformado)').transform({
            process: function ($, el) {
                el.addClass('transformado');
                // código para transformar cada nodo!
                // este es un código de ejemplo
                el.find('.descripcion').appendTo(el.find('.views-field-field-imagen-fiesta'));
            }
        });
    }

    $.initModule('.lista-ruta-fiestas', function () {
        transformar();
        jq(document).ajaxComplete(function () {
            setTimeout(transformar, 50);
        });
        jQuery.cookie("filtrofiesta","Todos",0.05);
    });

}(jQuery2, jQuery));