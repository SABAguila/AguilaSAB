/* global jQuery, jQuery2 */

// Notice: This implementation allows to have only one Carousel instance per page

(function (jq, $) {
    'use strict';
    var colorboxKiller,
        colorboxNode = '.media-gallery-thumb.cbEnabled.cboxElement',
        lightboxElements = [];

    $(document).ready(function($) {
        lightboxElements = $(colorboxNode);

        if($(lightboxElements).length) {
            // Repeatedly remove colorbox until it achieves
            colorboxKiller = setInterval(function(){
                removeColorbox();
            }, 100);

            $('body').on('click touch', '.media-gallery-social-share a', function(e) {
                var mediaUrl = $(this).parents('figure').eq(0).find('.mfp-img').attr('src');
                socialShare($(this).attr('class'), mediaUrl);
                e.preventDefault();
            });

            // Add the total amount of elements in galleries
            $('.galeryCounter').html($(lightboxElements).length + ' FOTOS');
        }
    });

    function removeColorbox() {
        // Before removing Colorbox, reuse its attributes
        $(lightboxElements).each(function(i, el){
            $(el).attr('data-mfp-src', $(el).attr('data-src'));
        });

        // Magnific instance
        $(lightboxElements).magnificPopup({
            type: 'image',
            tClose: 'Cerrar (Esc)',
            tLoading: 'Cargando...',
                callbacks: {
                    open: function() {
                        $('.mfp-prevent-close').insertBefore('.mfp-close');
                    }
                },
            image: {
                titleSrc: function(item) {
                    return '<a class="download" href="media/'+item.el.attr('href').split('/').pop()+'/download" target="_blank">Descargar</a>' +
                            '<span>Compartir</span>'+
                            '<ul class="media-gallery-social-share">' +
                                '<li><a class="fb" href="#">Facebook</a></li>' +
                                '<li><a class="twitter" href="#">Twitter</a></li>' +
                            '</ul>';
                },
                tError: 'No se pudo cargar <a href="%url%">la imagen</a>.'
            },
            gallery: {
                enabled: true,
                tPrev: 'Anterior (Tecla de flecha izquierda)',
                tNext: 'Siguiente (Tecla de flecha derecha)',
                tCounter: '%curr% de %total%'
            }
        });

        // Remove the ColorBox plugin (jq), and use Magnific ($) instead
        jq.colorbox.remove();
        clearInterval(colorboxKiller);
    }

    function socialShare(social, path) {
        switch(social) {
            case 'fb':
            window.open( 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(path),
                '', 'status=1,width=626,height=436,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no');
            break;
            case 'twitter':
            window.open( 'http://twitter.com/share?url='+encodeURIComponent(path),
                '','status=1,width=626,height=436,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no');
            break;
        }
    }

}(jQuery, jQuery2));