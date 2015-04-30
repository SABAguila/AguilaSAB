/*global jQuery2 */
(function ($) {
    $(document).ready(function(){
        //Put nececsaryclasses for initialize slider
        $(".item-lista-chicas-aguila").parent().addClass("parent-slick").attr("id","conocelas");
        $(".item-lista-chicas-aguila").closest(".field-items").addClass("container-slider").append("<div class='deg left'></div><div class='deg right'></div>");

        var slider = $('.parent-slick');

        //Set slider images as css background images
        slider.find(".views-row").each(function(index, el) {
            borderClass = $.trim($(this).find('.slider-border').text());
            imagePath = $.trim($(this).find('.slider-background img').attr('src'));
            $(this).css({'background-image': 'url('+imagePath+')'});
            $(this).addClass(borderClass);
        });
        
        //Initialize Slick slider
        slider.slick({
            slidesToShow:3,
            slidesToScroll: 3,
            dots: true,
            centerMode: true,
            focusOnSelect: true,
            infinite:true,
            variableWidth: true,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                  }
                },
                {
                  breakpoint: 900,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
            // onSetPosition: function (slickSlider) {
            //     var slideContent = slider.find('.slide-content');

            //     if (slideContent.length) {
            //         //Set size for slide-content.
            //         slider.find('.slide-content').width(slickSlider.$slider.width());
            //     }
            // },
            // onBeforeChange: function(slider,index){
            //     window.console && console.log(index);
            //     hide_alternative_content();
            // },
            // onAfterChange: function(slider,index){
            //     window.console && console.log(index);
            // },
        });
        //Add down arrow below the banner  
    });
}(jQuery2));