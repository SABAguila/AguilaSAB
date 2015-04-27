/*global jQuery2 */
(function ($) {

    function validGeolocation(value) {
        return value !== undefined && value !== null && value !== '';
    }
    $.initModule('.ver-mapa-lugar-detalle a', function ($, node) {
        node.bind("click", function(event ) {
                    event.preventDefault();
                    jQuery("body").scrollTo('.mapa-lugar-detalle',800);
                });
        if (validGeolocation(node.data('latitude')) && validGeolocation(node.data('longitude'))) {
            $.mapsLoaded.promise().then(function () {
                var position = new google.maps.LatLng(parseFloat(node.data('latitude')), parseFloat(node.data('longitude'))),
                    mapOptions = {
                        zoom: 17,
                        center: position,
                        styles: $.mapStyles.grayscale,
                        scrollwheel: false,
                    },
                    map = new google.maps.Map($('.mapa-lugar-detalle')[0], mapOptions),


                    var iconBase = '/sites/g/files/ogq1136/f/201504/';
                    marker = new google.maps.Marker({
                        position: position,
                        title: $('.banner-lugar-fiesta h1').text(),
                        map: map,
                        icon: iconBase + 'markerMaps.png'
                    }),
                    infowindow = new google.maps.InfoWindow({
                        content: '<div class="lugar-info-window map-info-window"><h1>' + $('.banner-lugar-fiesta h1').text() + '</h1></div>'
                    });
                    $('.mapa-lugar-detalle').removeClass("hidden");
                google.maps.event.addListener(map, 'click', function () {
                    map.setOptions({
                        scrollwheel: true,
                    });
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });
            });
        }
    });
}(jQuery2));