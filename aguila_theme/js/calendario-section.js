/*global jQuery2 */
(function ($, jq) {
    var eventos, fechas, dias, colorEvento, fechaEvento, overlays, dia, evento, banner;
        
    function checkOverlayPosition($) {
        $(".evento-calendario-overlay").each(function(i,overlay){
            overlay = $(overlay);
            monthview = overlay.closest(".monthview");
            //reset
            overlay.removeClass("forceup");
            overlay.attr("style","");
            overlay.find(".box-arrow").attr("style","");
            //test
            if(monthview.offset().left+monthview.width()/2<220) {
                overlay.addClass("forceup");
                if(overlay.offset().left<0) {
                    if (overlay.css("left").indexOf("px")>-1) {
                        overlay.css("left", parseInt(overlay.css("left")) - overlay.offset().left )
                    }
                }
                var arrowx = monthview.width()/2 - parseInt(overlay.css("margin-left")) - overlay.position().left;
                overlay.find(".box-arrow").css("left",arrowx);

            }
            
        });
    }
    
    function transformarCal() {
        $(".view-calendario-chicas-aguila").find(".calendar-calendar:not(.transformado)").transform({
            process: function ($, calendar) {
                calendar.addClass('transformado');
                
                fechas = calendar.find("tr.date-box");
                dias = calendar.find("tr.single-day");
                eventos = dias.find(".evento-calendario");
                overlays = $('.evento-calendario-overlay');

                // Add some Evento styles and markup modifications
                eventos.each(function(i, el) {
                    colorEvento = $(el).find(".color").text().toLowerCase();
                    fechaEvento = $(el).closest("td").attr("data-date");
                    dia = fechas.find("td[data-date*="+fechaEvento+"]");
                    evento = dias.find("td[data-date*="+fechaEvento+"]");
                    // Add color based on selection
                    dia.addClass(colorEvento);
                    evento.find('.inner').addClass(colorEvento);
                    // Duplicate day on overlay
                    evento.find('.evento-calendario-overlay .date').text(dia.find('.day').text());
                    // Add custom banner as background
                    banner = evento.find('.bg');
                    if($(banner).length) {
                        banner.closest('.banner').css('backgroundImage', 'url(' + banner.find('img').attr('src') + ')');
                    }
                });

                // Reusing some variables
                fechaEvento = "";
                dia = "";
                evento = "";
                // Add click event to display Evento overlay
                fechas.find('td').on('click touchend', function(event) {
                    fechaEvento = $(this).attr('data-date');
                    evento = dias.find("td[data-date*="+fechaEvento+"]");
                    // Hide all overlays and show the correct overlay
                    overlays.addClass("hidden");
                    evento.find(".evento-calendario-overlay").removeClass("hidden");
                    checkOverlayPosition($);
                    // Deactivate selected state in Dias and Eventos and activate only for the correct
                    fechas.find('td').removeClass('evento-selected');
                    dias.find('td').removeClass('evento-selected');
                    $(this).addClass('evento-selected');
                    evento.addClass('evento-selected');
                    event.preventDefault();
                });
                dias.find('td').on('click touchend', function(event) {
                    fechaEvento = $(this).attr('data-date');
                    dia = fechas.find("td[data-date*="+fechaEvento+"]");
                    // Hide all overlays and show the correct overlay
                    overlays.addClass("hidden");
                    $(this).find(".evento-calendario-overlay").removeClass("hidden");
                    checkOverlayPosition($);
                    // Deactivate selected state in Dias and Eventos and activate only for the correct
                    fechas.find('td').removeClass('evento-selected');
                    dias.find('td').removeClass('evento-selected');
                    $(this).addClass('evento-selected');
                    dia.addClass('evento-selected');
                    event.preventDefault();
                });

                var fecha = $(".date-heading h3").html().replace(/[A-Za-z\u00C0-\u017F]+, ([A-Za-z\u00C0-\u017F]+) [0-9]+, ([0-9]+)/gi, "$1, $2");
                $(".date-heading h3").html(fecha).addClass("formatted");
                
                
               $("td.single-day:not(.no-entry):not(.empty)").each(function(i,el){
                    var evento = $("<div class='event-tobe'></div>");
                    var partesFecha = $(el).attr("data-date").split("-");
                    evento.attr("data-date", partesFecha[1]+"-"+partesFecha[2]+"-"+partesFecha[0]);
                    evento.append($(el).find(".evento-calendario-overlay").clone().removeClass("hidden"));

                    jQuery("#mobile-calendar .events").append(evento);
                });

                var partesFecha = $($("td.single-day")[10]).attr("data-date").split("-");
                jQuery("#mobile-calendar").dzscalendar({ 
                    settings_alwaysinclude6rows: "on",
                    start_month: partesFecha[1],
                    start_year: partesFecha[0]
                 });

                $('#mobile-calendar .week-day').click(function(e){
                    if($(this).hasClass('hasEvent')){
                        e.stopPropagation();
                        var date = $(this).data('date');
                        date = date.split('-');
                        date = date[2]+'-'+n(date[0])+'-'+n(date[1]);
                        var dateSelected = new Date(date);
                        var numDay = $(this).find('.the-number').text();
                        var nameDay = getNameDay(dateSelected);
                        var nameEvent = $(this).find('h4.title').text();
                        var currentMonth = $('.date-nav .formatted').text();
                        currentMonth = currentMonth.split(',');
                        var image = $('.banner-calendario-chicas-aguila .banner .banner-'+currentMonth[0].toLowerCase()+' img').attr('src');
                        $('.popup-evento-mobile').css('background','url("'+image+'") no-repeat');
                        popupEventMobile(numDay, nameDay, nameEvent);
                        $('.popup-evento-mobile').css('display','block');
                        return false;
                    }
                });

                $(document).click(function(){
                    $('.popup-evento-mobile').css('display','none');
                });

            }
        });
    }

    function getNameDay(date){
        var weekday = new Array(7);
        weekday[0]=  "Domingo";
        weekday[1] = "Lunes";
        weekday[2] = "Martes";
        weekday[3] = "Miércoles";
        weekday[4] = "Jueves";
        weekday[5] = "Viernes";
        weekday[6] = "Sábado";

        var n = weekday[date.getDay()+1]; 
        return n;
    }

    function n(n){
        return n > 9 ? "" + n: "0" + n;
    }

    function popupEventMobile(numDay, nameDay, nameEvent) {
        $('.popup-evento-mobile .number').text('');
        $('.popup-evento-mobile .day').text('');
        $('.popup-evento-mobile .title').text('');

        $('.popup-evento-mobile .number').text(numDay);
        $('.popup-evento-mobile .day').html(nameDay);
        $('.popup-evento-mobile .title').text(nameEvent);
    }

    function setTextCurrentDate() {
        var currentDate = $(".view-calendario-chicas-aguila").find('td.today').data('date');
        $(".view-calendario-chicas-aguila").find('tr.single-day').find("[data-date='" + currentDate + "']").find('.inner').html('<div class="hoy">hoy</div>');
    }

    function hideImagesMonth() {
        if($(window).width() >= 600){
            var currentMonth = $('.date-nav .formatted').text();
            currentMonth = currentMonth.split(',');
            var arrayMonthImage = $('.view-calendario-chicas-aguila .view-banner-calendario-chicas-aguila .banner ').find('div');
            $.each(arrayMonthImage, function(index, value){
                var monthBanner = $(this).attr('class').split('-');
                monthBanner = monthBanner[1];
                if(currentMonth[0].toLowerCase() == monthBanner.toLowerCase()){
                    $(this).show();
                }
            });
        }
        else{
            var arrayMonthImage = $('.view-calendario-chicas-aguila .view-banner-calendario-chicas-aguila .banner ').find('div');
            $.each(arrayMonthImage, function(index, value){
                $(this).hide();
            });
        }
    }

    function printRedSunday() {
        var sundays = $('.view-calendario-chicas-aguila tbody .date-box td');
        $.each(sundays, function(){
            if($(this).attr('headers') == 'Domingo'){
                $(this).find('.month.day').css('color','#FF0000');
            }
        });
    }

    $(window).resize(function(){console.info('asd');
        hideImagesMonth();
    });

    $.initModule(".view-calendario-chicas-aguila", function () {
        transformarCal();
        hideImagesMonth();
        setTextCurrentDate();
        printRedSunday();
        jq(document).ajaxComplete(function () {
            setTimeout(transformarCal, 50);
            setTimeout(hideImagesMonth, 50);
            setTimeout(printRedSunday, 50);
        });
    });
}(jQuery2, jQuery));
