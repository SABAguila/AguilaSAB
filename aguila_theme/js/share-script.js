(function ($) {
    $(document).ready(function () {
        console.log("shareMap");
        var currentUrl = location.href;
        $('.field-label-hidden, #social>li').on('click touch', function(e){
            
            if( $(this).hasClass("field-name-field-facebook") ){
                sharePop('facebook', currentUrl);
            }else if( $(this).hasClass("field-name-field-twitter") ){
                sharePop('twitter', currentUrl);                
            }            
            e.preventDefault();
        });

        $('.container-map').on('click touch', 'li', function(e){
            currentUrl = location.href;
            currentUrl = currentUrl+"%23map"
            if( $(this).hasClass("field-name-field-facebook") ){
                sharePop('facebook', currentUrl);
            }else if( $(this).hasClass("field-name-field-twitter") ){
                sharePop('twitter', currentUrl);                
            }
            e.preventDefault();
        });
        $(".field-name-field-link-seguir-leyendo a").click(function(e){
            $(" .node-fiestas .content .field-item p").show();
            $(".node-fiestas .field-name-field-link-seguir-leyendo a").hide();
            e.preventDefault();
        });

    });

    $('.view-lista-de-lugares-de-fiesta li .views-field-field-facebook img').on('click touch', function(){
        var currentUrl = getBaseUrl() + $(this).closest('li').find('.views-field-title a').attr('href');
        sharePop('facebook', currentUrl);
    });
    $('.view-lista-de-lugares-de-fiesta li .views-field-field-twitter img').on('click touch', function(){
        var currentUrl = getBaseUrl() +  $(this).closest('li').find('.views-field-title a').attr('href');
        sharePop('twitter', currentUrl);
    });

    function getBaseUrl(){
        pathArray = location.href.split( '/' );
        protocol = pathArray[0];
        host = pathArray[2];
        url = protocol + '//' + host;
        return url;
    }

    function sharePop(service, url){

        switch(service) {
            case 'facebook':
                window.open( 'https://www.facebook.com/sharer/sharer.php?u='+url,
            '', 'status=1,width=626,height=436,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no');
                break;
            case 'twitter':
                window.open( 'http://twitter.com/share?url='+url,
            '','status=1,width=626,height=436,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no');
                break;              
        }
    }
}(jQuery2));