/*global jQuery2 */
(function ($) {
    var node = ".descripcion-chicas-aguila";

    $.initModule(node, function ($, el) {
        var bgNode = el.find(".views-field-field-imagen-fondo a")[0];
        if($(bgNode).length) {
            el.css('backgroundImage', 'url(' + $(bgNode).attr('href') + ')');
        }
    });

}(jQuery2));