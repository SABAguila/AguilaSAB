/* global jQuery, jQuery2 */

// Notice: This implementation allows to have only one Carousel instance per page

(function (jq, $) {
    'use strict';
    var colorboxKiller,
        colorboxNode = '.media-gallery-thumb.cbEnabled.cboxElement',
        lightboxElements = [];

    $(document).ready(function($) {

        var NumImgHash = parseInt(location.hash.substring(8));

        setTimeout(function(){
            console.log("next, prev counter watching");
            if(NumImgHash != ""){
                $(".media-gallery-thumb>img").eq(NumImgHash - 1).trigger("click");
            }
        },600)
        

        lightboxElements = $(colorboxNode);

        if($(lightboxElements).length) {
            // Repeatedly remove colorbox until it achieves
            colorboxKiller = setInterval(function(){
                removeColorbox();
            }, 100);

            //Set the specific image selected so that the popUp library con be manipulated for sharing
            $('body').on('click touch', '.media-gallery-media-item-thumbnail', function(e) {
                var indexImg = $(this).parent().index() + 1;
                var galleng = $(lightboxElements).length;
                location.hash="galeria"+indexImg;

                $.magnificPopup.instance.next = function() {
                    if(indexImg == galleng){
                        indexImg = 1;    
                    }
                    else{
                        indexImg++;                        
                    }
                    location.hash="galeria"+indexImg;
                    $.magnificPopup.proto.next.call(this);
                };
                $.magnificPopup.instance.prev = function() {
                    if(indexImg == 1){
                        indexImg = galleng;    
                    }
                    else{
                        indexImg--;
                    }
                     location.hash="galeria"+indexImg;
                    $.magnificPopup.proto.prev.call(this);
                };


            });

            $('body').on('click touch', '.media-gallery-social-share a', function(e) {
                //var mediaUrl = $(this).parents('figure').eq(0).find('.mfp-img').attr('src') ;
                var mediaUrl = location.href;
                var imgurl = $('.media-gallery-social-share a').closest('figure').find('img').attr('src');
                socialShare($(this).attr('class'), mediaUrl, imgurl);
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
                                '<li><a class="fb" href="#">Facebooks</a></li>' +
                                '<li><a class="twitter" href="#">Twitters</a></li>' +
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

    function socialShare(social, path, img) {
        switch(social) {
            case 'fb':
            //window.open( 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(path),+'&p[images][0]=' + encodeURIComponent('http://aguilaosg042015.sabmiller.acsitefactory.com/sites/g/files/ogq1136/f/styles/media_gallery_large/public/201501/FOTO-CONTRAPORTADA-PARED.jpg'), 'status=1,width=626,height=436,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no');
            window.open( 'https://www.facebook.com/dialog/feed?app_id=277460082360332&redirect_uri=http://www.cervezaaguila.com/closepopup&picture='+encodeURIComponent(img)+'&display=popup&link='+encodeURIComponent(path),'','status=1,width=626,height=436,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no');
            break;
            case 'twitter':
            window.open( 'http://twitter.com/share?url='+encodeURIComponent(path),
                '','status=1,width=626,height=436,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no');
            break;
        }
    }

}(jQuery, jQuery2));

