/*global jQuery2 */
(function ($) {
    $(document).ready(function () {
        $.mapStyles = {
            grayscale: [
                {
                    featureType: 'all',
                    elementType: 'all',
                    stylers: [
                        {
                            saturation: -10,
                            lightness: 40
                        }
                    ]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [
                        {
                            lightness: 70
                        }
                    ]
                },
                {
                    featureType: "poi",
                    stylers: [
                      { visibility: "off" }
                    ]
                }
            ]
        };
        $.getScript('https://maps.google.com/maps/api/js?key=AIzaSyDRgtwDVw1x16aunrX0YIqWJYFgw-jCfYI&callback=initMaps');
    });
}(jQuery2));