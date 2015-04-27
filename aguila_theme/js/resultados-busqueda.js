/*global jQuery2 */
(function ($) {
    
    $.initModule(".search-results", function ($, searchBtn) {
        $(".search-result").each(function(i,el){
            deleteThisResult = false;
            if($(el).find("a").attr("href").indexOf("/galeria/")>-1) deleteThisResult = true;
            if($(el).find("a").attr("href").indexOf("/content/")>-1) deleteThisResult = true;
            if($(el).find("a").attr("href").indexOf("/node/111")>-1) deleteThisResult = true;
            if(deleteThisResult) $(el).remove();
        });
    });
}(jQuery2));

