/*global jQuery2, jQuery, document */
(function ($, jq) {

    var map;
    var markers = [];
    var centerLatlng;

    function transformar() {
        // no se puede utilizar la referencia a la lista porque el nodo en el DOM cambia
        $('.lista-lugares-fiesta').find('.view-content > .item-list > ul > li.views-row:not(.transformado)').transform({
            process: function ($, el) {
                var rating,
                    ratingText;

                el.addClass('transformado clearfix');

                if (el.find('.favoritos.logged-in').length === 0) {
                    el.find('.favoritos.hidden').removeClass('hidden');
                }
                if (el.find('.favoritos-hover.link')) {
                    el.find('.favorites-hover.hidden').removeClass('hidden');
                }

                // clean the rating field
                rating = el.find('.views-field-field-rating .clearfix');
                ratingParent = rating.parent();
                rating.remove();
                ratingParent.prepend('<span>' + rating.text().replace('/5', '') + '</span>');
                
            }           
        });
        
        var clase_tipo_evento = $('.view-lista-de-lugares-de-fiesta li .views-field-field-tipo-de-lugar .field-content').find('div');
        $.each(clase_tipo_evento, function(index, value){
            var clases = $(this).attr('class');
            $(this).closest('li').addClass(clases);
        });

    }

    function unsortTilesEvents(){        
        var wrapList = $('.view-lista-de-lugares-de-fiesta .view-content .item-list ul');
        var mobileCellPhone = (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|windows phone/i.test(navigator.userAgent));

        if( wrapList.length > 0 && document.documentElement.clientWidth > 736 && !mobileCellPhone){            
            var container = document.querySelector('.view-lista-de-lugares-de-fiesta .view-content .item-list ul');            
            var msnry = new Masonry( container, {         
                itemSelector: 'li'              
            });
            setTimeout(function(){ 
                msnry.reloadItems();
                msnry.layout();  
            }, 700);            
        }
    }
    
    
    function validGeolocation(value) {
        return value !== undefined && value !== null && value !== '';
    }
    function centerMap() {
        var latlngbounds = new google.maps.LatLngBounds();
        $(markers).each(function(i,data) {
           latlngbounds.extend(data.marker.getPosition());
        });
        centerLatlng = latlngbounds.getCenter();
        map.setCenter(centerLatlng);
        map.fitBounds(latlngbounds); 
    }

    function convertDate(date){
        date = date.split(' ');
        date = date[0].split('-');
        var arrayMonths = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        var newDate = date[2] + ' ' + arrayMonths[date[1]-1] + ' ' + date[0];
        return newDate;
    }
    
    function updateMapMarkers() {
        
        
        mapOptions = {
            zoom: 6,
            styles: $.mapStyles.grayscale,
            center: new google.maps.LatLng(4.6194477,-74.110567),
            scrollwheel: false,
        },
        map = new google.maps.Map($('.mapa-lugar-detalle')[0], mapOptions);
        $('.mapa-lugar-detalle').removeClass("hidden");
        
        var linksWithCoords = $('.lista-lugares-fiesta').find('.view-map');
        linksWithCoords.each(function(i, node) {
            node = $(node);
            if (validGeolocation(node.data('latitude')) && validGeolocation(node.data('longitude'))) {
                var position = new google.maps.LatLng(parseFloat(node.data('latitude')),parseFloat(node.data('longitude')));
                var iconBase = '/sites/g/files/ogq1136/f/201504/';
                var fechaFiesta = convertDate(node.data('fecha'));
                var horarioFecha = node.data('horario');
                var lugarFiesta = node.data('lugar');
                var cuidadFiesta = node.data('ciudad');
                var marker = new google.maps.Marker({
                    position: position,
                    title: node.data('placename'),
                    icon: iconBase + 'markerMaps.png'
                });
                infowindow = new google.maps.InfoWindow({
                    content: '<div class="lugar-info-window map-info-window"><img src="/sites/g/files/ogq1136/f/201504/CarnavalTooltipImg.png"><h1>' + node.data('placename') + '</h1><ul id="social"><li class="facebook"></li><li class="twitter"></li></ul><div class="information"><div class="fecha"><strong>Fecha:</strong> '+fechaFiesta+'</div><div class="horario"><strong>Hora:</strong> '+horarioFecha+'</div><div class="ciudad"><strong>Ciudad:</strong> '+cuidadFiesta+'</div><div class="lugar"><strong>Lugar:</strong> '+lugarFiesta+'</div></div></div>',
                    maxWidth : 215
                });
                node.data("marker",marker);
                node.data("position",position);
                node.data("infowindow",infowindow);
                markers.push({marker:marker, infowindow: infowindow});
                node.bind("click", function(event ) {
                    event.preventDefault();
                    jQuery("body").scrollTo('.mapa-lugar-detalle',800);
                    $(markers).each(function(j,alldata) { alldata.infowindow.close(); });
                    var position = $(this).data("position");
                    var marker = $(this).data("marker");
                    map.panTo(position);
                    map.setZoom(16);
                    $(this).data("infowindow").open(map, marker);
                });
                
                marker.setMap(map);

                google.maps.event.addListener(infowindow, 'domready', function() {

                    // Reference to the DIV which receives the contents of the infowindow using jQuery
                    var iwOuter = $('.gm-style-iw');

                    /* The DIV we want to change is above the .gm-style-iw DIV.
                    * So, we use jQuery and create a iwBackground variable,
                    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
                    */
                    var iwBackground = iwOuter.prev();

                    // Remove the background shadow DIV
                    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

                    // Remove the white background DIV
                    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

                    // Moves the shadow of the arrow 76px to the left margin 
                    iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'display: none !important;'});

                    // Moves the arrow 76px to the left margin 
                    iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'display: none !important;'});


                    // Taking advantage of the already established reference to
                    // div .gm-style-iw with iwOuter variable.
                    // You must set a new variable iwCloseBtn.
                    // Using the .next() method of JQuery you reference the following div to .gm-style-iw.
                    // Is this div that groups the close button elements.
                    var iwCloseBtn = iwOuter.next();

                    // Apply the desired effect to the close button
                    iwCloseBtn.css({
                        opacity: '1', // by default the close button has an opacity of 0.7
                        right: '38px',
                        top: '3px', // button repositioning                        
                        'border-radius': '13px', // circular effect
                        'box-shadow': 'rgb(11, 93, 153) 0px 0px 5px' // 3D effect to highlight the button
                        
                    });
                    iwCloseBtn.next().css({
                        right: '15%',
                        'width': '40px'
                    });

                    // The API automatically applies 0.7 opacity to the button after the mouseout event.
                    // This function reverses this event to the desired value.
                    iwCloseBtn.mouseout(function(){
                        $(this).css({opacity: '1'});
                    });

                });
                
                google.maps.event.addListener(marker, 'click', function () {
                    $(markers).each(function(j,alldata) { 
                        if(alldata.marker == marker) {
                            alldata.infowindow.open(map, marker);
                        }else{
                            alldata.infowindow.close(); 
                        }
                    });
                });
                
            }else{
                node.addClass("hidden");
            }
        });
        if (markers.length>0) {
            $('.view-map-all').bind("click",function(){
                event.preventDefault();
                map.setZoom(6);
                $(markers).each(function(j,alldata) { alldata.infowindow.close(); });
                map.panTo(centerLatlng);
                jQuery("body").scrollTo('.mapa-lugar-detalle',800);

            });
            google.maps.event.addListener(map, 'click', function () {
                map.setOptions({
                    scrollwheel: true,
                });
            });
            google.maps.event.addDomListener(window, "resize", function() {
                centerMap();
            });
            centerMap();
        }
    }
    $.initModule('.lista-lugares-fiesta', function () {
        transformar();
        unsortTilesEvents();
        jq(document).ajaxComplete(function () {
            setTimeout(transformar, 50);
            unsortTilesEvents();
        });
        $.mapsLoaded.promise().then(function () {
            updateMapMarkers();
        });
    });    

}(jQuery2, jQuery));