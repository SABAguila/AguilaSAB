/*global jQuery2 */
(function ($, jq) {
    var node = '.view-dynamic-filter';
    
    $.initModule(node, function ($, filters) {
        filters.on('click', '.filter', function(e) {
            e.returnValue = false;
            e.preventDefault();             
            $=jQuery2;
            jq=jQuery;
            var $this = $(this),
                widgets = jq('.views-exposed-widgets'),
                select = widgets.find('select'),
                submit = widgets.find('input[type=submit]'),
                text = $this.hasClass('all') ? null : $this.text();
                $('.filter.active').removeClass('active');
                $this.addClass('active');
            if (!text) {
                select.val(select.find('option:first').val());
                jq.cookie("filtrofiesta","Todos",0.05);
            } else {
                select.val(select.find('option:contains("' + $this.text() + '")').val());
                jq.cookie("filtrofiesta",text,0.05);
            }
            submit.click();
        });
        var lastFilter = jQuery.cookie("filtrofiesta");
        if(lastFilter) {
            setTimeout(function(lastFilter) {
                link = $('.view-dynamic-filter').find('.filter:contains("'+lastFilter+'")');
                if (link) { 
                    link.trigger("click");
                }else{
                    filters.find('.filter.all').trigger("click");
                }
            },500,lastFilter);
            
        }
        filters.find('.filter.all').addClass('active');
    });
}(jQuery2, jQuery));