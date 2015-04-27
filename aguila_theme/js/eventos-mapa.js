/*global jQuery2 */
(function ($) {
    console.log("Eventos Mapa icon");
    var map;
    var markers = [];
    var centerLatlng;
    
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

    $.initModule('.mapa-eventos', function ($) {
        $.mapsLoaded.promise().then(function () {
        
            mapOptions = {
                zoom: 6,
                styles: $.mapStyles.grayscale,
                center: new google.maps.LatLng(4.6194477,-74.110567),
                scrollwheel: false,
            },
            map = new google.maps.Map($('.mapa-eventos')[0], mapOptions);
    
            var linksWithCoords = $('.evento');
            linksWithCoords.each(function(i, node) {
                node = $(node);
                if (validGeolocation(node.data('latitude')) && validGeolocation(node.data('longitude'))) {
                    var position = new google.maps.LatLng(parseFloat(node.data('latitude')),parseFloat(node.data('longitude')));
                    var iconBase = '/sites/g/files/ogq1136/f/201504/';
                    var marker = new google.maps.Marker({
                        position: position,
                        title: node.data('title'),
                        icon: iconBase + 'markerMaps.png'
                    });
                    infowindow = new google.maps.InfoWindow({
                        content: node.html()
                    });
                    
                    markers.push({marker:marker, infowindow: infowindow});
                    marker.setMap(map);
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
                    map.setZoom(6);
                    $(markers).each(function(j,alldata) { alldata.infowindow.close(); });
                    map.panTo(centerLatlng);
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
        
        });
    });
}(jQuery2));