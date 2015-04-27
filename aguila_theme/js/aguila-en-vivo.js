window.arr_weekdays = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
window.arr_monthnames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre" ];

/*global jQuery2, moment*/
(function ($) {
    var node = "#block-views-lista-de-galerias-block .date-display-single";

    $.initModule(node, function ($, dateNode) {
        dateNode.text(moment($.trim(dateNode.text()), "YYYY-MM-DD").format('MMMM D [de] YYYY'));
    });
    
    $.initModule("#tr1", function ($, node) {
    
    $("#block-system-main .field-items").append($(".calendarBox"));
    
        $(".event-tobe").each(function(i, node) {
            node = $(node).clone();
            node.attr("data-date", node.data("date").replace(/\//g,"-") );
            node.appendTo( $(".aguila-en-vivo .events") );
        });
        
        jQuery(".mostrarMapa a").click(function(event) {
            event.preventDefault();
            jQuery("body").scrollTo('.mapa-lugar-detalle',600);
        });
        
        function onMonthChange () {
            window.console && console.log("on Month Change");
            $(".calendar-header").attr("style","").empty();
            
            var firstDay = jQuery2(".calendarContainer .week-day.hasEvent")[0];
            if (firstDay) {
                jQuery2(firstDay).trigger("click");
            }
        }
        
        $(".calendarContainer").on('touchend click', ".week-day.hasEvent", function() {
            var head = jQuery(".calendar-header");
            head.html( $(this).find(".the-event-content").clone() );
            var path = head.find(".event-image img").attr("src");
            head.find(".event-image").remove();
            head.css("background-image","url('"+path+"')");
            
        });
        
        jQuery("#tr1").dzscalendar({ settings_alwaysinclude6rows: "on", design_transitionDesc: "showContent", onMonthChange: onMonthChange });
        setTimeout( onMonthChange, 200 );
    });
    
    

}(jQuery2));