'use strict';
(function(){
    $(document).ready(function(){
        var page = getURLParameter('page') || 1;                
        getLeads(page);        
        $("#csvExport").click(function(){
            var page = getURLParameter('page') || 1;    
            window.open("/csv?page="+page);
        });
        $("#csvExportAll").click(function(){             
            window.open("/csv?page=-1");
        });
        $("#csvExportAllDB").click(function(){             
            window.open("/allDB");
        });
    });

    function buildLine(data){
        var html = "<tr>";
        html+= "<td>"+data.matricula+"</td>";
        html+= "<td>"+data.name+"</td>";
        html+= "<td>"+data.email+"</td>";
        html+= "<td>"+data.phone+"</td>";
        html+= "<td>"+data.localizacao+"</td>";        
        html+= "<td>"+data.oferta+"</td>";
        html+= "<td>"+data.created+"</td>";        
        html+= "</tr>";
        return html;
    }

    function getLeads(pageNum){
        var opt = {
            page: pageNum
        }
        $.get("leadslist", opt, function(data){
            $("#totalRegistos").text("-");
            $("#pagination").empty();
            if(data && data.status == "OK"){
                var leads = data.data;
                var html = "";
                for(var i=0; i<leads.length; i++){                    
                    html+=buildLine(leads[i]);
                }                
                $("#leadsList").html(html);
                // PAGINATION
                var numPages = data.numPages;
                var totalElems = data.totalElems;
                $("#totalRegistos").text(totalElems);
                var currPage = data.currPage;                
                var pagination = "";
                // PREV BUTTON      
                if(currPage>1 && currPage<=numPages){
                    pagination+= '<li>';
                    pagination+= '<a href="?page='+(currPage-1)+'">'; 
                } else {
                    pagination+= '<li class="disabled">';
                    pagination+= '<a href="javascript:;">'; 
                }                                                
                pagination+= '<span class="glyphicon glyphicon-chevron-left"></span></a></li>';
                var displayedPages = 3; // MAX PAGE NUMBER TO SHOW
                var diplayArround = 2;
                if(numPages>displayedPages){
                    // SPECIAL MAGIC TO SHOW ONLY 5 PAGES
                    if(currPage<=(displayedPages+diplayArround)){
                        var lastPage = currPage+diplayArround;
                        if(numPages == (displayedPages+diplayArround) ) lastPage = numPages;
                        if(lastPage>numPages) lastPage = numPages;
                        
                        for(var i=1; i<=lastPage; i++){
                            pagination+='<li class="'+((currPage==i)?'active':'')+'">';
                            pagination+='<a href="?page='+i+'">'+i+'</a></li>';
                        }                        
                        if(numPages>(displayedPages+diplayArround)){
                            pagination+='<li><a href="javascript:;">...</a></li>'; // SPLIT
                            // ADD LAST ELEMS
                            for(var i=(numPages-displayedPages+1); i<=numPages; i++){
                                pagination+='<li class="'+((currPage==i)?'active':'')+'">';
                                pagination+='<a href="?page='+i+'">'+i+'</a></li>';
                            }
                        }                        
                    } else {                        
                        for(var i=1; i<=diplayArround; i++){
                            pagination+='<li class="'+((currPage==i)?'active':'')+'">';
                            pagination+='<a href="?page='+i+'">'+i+'</a></li>';
                        }
                        if(currPage<(numPages-diplayArround-displayedPages)){
                            pagination+='<li><a href="javascript:;">...</a></li>'; // SPLIT
                            for(var i=(currPage-diplayArround); i<=(currPage+diplayArround); i++){
                                pagination+='<li class="'+((currPage==i)?'active':'')+'">';
                                pagination+='<a href="?page='+i+'">'+i+'</a></li>';
                            }
                            pagination+='<li><a href="javascript:;">...</a></li>'; // SPLIT
                            // ADD LAST ELEMS
                            for(var i=(numPages-displayedPages+diplayArround); i<=numPages; i++){
                                pagination+='<li class="'+((currPage==i)?'active':'')+'">';
                                pagination+='<a href="?page='+i+'">'+i+'</a></li>';
                            }
                        } else {
                            pagination+='<li><a href="javascript:;">...</a></li>'; // SPLIT
                            // ADD LAST ELEMS
                            for(var i=(currPage-diplayArround); i<=numPages; i++){
                                pagination+='<li class="'+((currPage==i)?'active':'')+'">';
                                pagination+='<a href="?page='+i+'">'+i+'</a></li>';
                            }
                        }                        
                    }
                } else {
                    // PAGE NUMBERS
                    for(var i=1; i<=numPages; i++){
                        pagination+='<li class="'+((currPage==i)?'active':'')+'">';
                        pagination+='<a href="?page='+i+'">'+i+'</a></li>';
                    }
                }
                // NEXT BUTTON
                if(numPages>1){
                    pagination+= '<li>';
                    pagination+= '<a href="?page='+(currPage+1)+'">';
                } else {
                    pagination+= '<li class="disabled">';
                    pagination+= '<a href="javascript:;">';
                }
                pagination+= '<span class="glyphicon glyphicon-chevron-right"></span>';
                // - - -
                $("#pagination").html(pagination);
            }                        
        });
    }

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }
})();