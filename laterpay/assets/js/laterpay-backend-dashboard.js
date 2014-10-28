!function(e){e(function(){function s(){var s,t,i={daysBack:8,itemsPerList:10,list:[],conversionDiagram:e("#lp_js_conversion-diagram"),salesDiagram:e("#lp_js_sales-diagram"),revenueDiagram:e("#lp_js_revenue-diagram"),totalImpressionsKPI:e("#lp_js_total-impressions"),avgConversionKPI:e("#lp_js_avg-conversion"),newCustomersKPI:e("#lp_js_share-of-new-customers"),avgItemsSoldKPI:e("#lp_js_avg-items-sold"),totalItemsSoldKPI:e("#lp_js_total-items-sold"),avgRevenueKPI:e("#lp_js_avg-revenue"),totalRevenueKPI:e("#lp_js_total-revenue"),bestConvertingList:e("#lp_js_best-converting-list"),leastConvertingList:e("#lp_js_least-converting-list"),bestSellingList:e("#lp_js_best-selling-list"),leastSellingList:e("#lp_js_least-selling-list"),bestGrossingList:e("#lp_js_best-grossing-list"),leastGrossingList:e("#lp_js_least-grossing-list")},o=function(){e("#lp_js_refresh-dashboard").click(function(e){r(),e.preventDefault()})},l=function(s){var t,o,l=[[14122944e5,0],[14123808e5,0],[14124672e5,0],[14125536e5,0],[141264e7,0],[14127264e5,0],[14128128e5,0],[14128992e5,0]],n=[[14122944e5,0],[14123808e5,0],[14124672e5,0],[14125536e5,0],[141264e7,0],[14127264e5,0],[14128128e5,0],[14128992e5,0]],r=[[1,13],[2,16],[3,14],[4,12],[5,17],[6,15],[7,12]],c=[[1,13],[2,29],[3,43],[4,55],[5,72],[6,87],[7,99]];8===i.daysBack?(t="%a",o="time"):31===i.daysBack?(t="%m/%d",o="time"):o=null,e.plot(i.conversionDiagram,[{data:[[1,100],[2,100],[3,100],[4,100],[5,100],[6,100],[7,100]],bars:{show:!0,barWidth:.7,fillColor:"#e3e3e3",lineWidth:0,align:"center",horizontal:!1}},{data:r,bars:{show:!0,barWidth:.35,fillColor:"#52CB75",lineWidth:0,align:"center",horizontal:!1}}],{legend:{show:!1},xaxis:{font:{color:"#bbb",lineHeight:18},show:!0,ticks:[[1,"Mon"],[2,"Tue"],[3,"Wed"],[4,"Thu"],[5,"Fri"],[6,"Sat"],[7,"Sun"]]},yaxis:{font:{color:"#bbb"},ticks:5,tickFormatter:function(e){return e+" %"},min:0,max:100,reserveSpace:!0},series:{shadowSize:0},grid:{borderWidth:{top:0,right:0,bottom:1,left:0},borderColor:"#ccc",tickColor:"rgba(247,247,247,0)"}}),e.plot(i.salesDiagram,[{data:l,color:"#52CB75",lines:{show:!0,lineWidth:1.5,fill:!1,gaps:!0},points:{show:!0,radius:3,lineWidth:0,fill:!0,fillColor:"#52CB75"}},{data:c,color:"#52CB75",lines:{show:!0,lineWidth:1.5,fill:!1,gaps:!0},points:{show:!0,radius:3,lineWidth:0,fill:!0,fillColor:"#52CB75"}}],{legend:{show:!1},xaxis:{font:{color:"#bbb",lineHeight:18},mode:o,timeformat:t,show:!0},yaxis:{font:{color:"#bbb"},ticks:5,min:0,reserveSpace:!0},series:{shadowSize:0},grid:{borderWidth:{top:0,right:0,bottom:1,left:0},borderColor:"#ccc",tickColor:"rgba(247,247,247,0)"}}),e.plot(i.revenueDiagram,[{data:n,color:"#52CB75",lines:{show:!0,lineWidth:1.5,fill:!1,gaps:!0},points:{show:!0,radius:3,lineWidth:0,fill:!0,fillColor:"#52CB75"}}],{legend:{show:!1},xaxis:{font:{color:"#bbb",lineHeight:18},show:!0,mode:o,timeformat:t},yaxis:{font:{color:"#bbb"},ticks:5,min:0,reserveSpace:!0},series:{shadowSize:0},grid:{borderWidth:{top:0,right:0,bottom:1,left:0},borderColor:"#ccc",tickColor:"rgba(247,247,247,0)"}}),i.totalImpressionsKPI.text(s.impressions),i.avgConversionKPI.text(s.conversion),i.newCustomersKPI.text("33"),i.avgItemsSoldKPI.text(s.avg_purchase),i.totalItemsSoldKPI.text(s.total_items_sold),i.avgRevenueKPI.text("3.33"),i.totalRevenueKPI.text(s.total_revenue),e(".lp_sparkline-bar").peity("bar",{width:34,height:14,gap:1,fill:function(){return"#ccc"}}),s&&(a(i.bestConvertingList,s.best_converting_items),a(i.leastConvertingList,s.least_converting_items),a(i.bestSellingList,s.most_selling_items),a(i.leastSellingList,s.least_selling_items),a(i.bestGrossingList,s.most_revenue_items),a(i.leastGrossingList,s.least_revenue_items))},a=function(e){if(i.list=[],s=0,t=10,t>0)for(;t>s;s++)i.list.push(n("Dummy Item",66,"EUR",[]));else i.list=["<dfn>"+lpVars.i18n.noData+"</dfn>"];e.html(i.list.join())},n=function(e,s,t,i){return'<li><span class="lp_sparkline-bar">'+i+'</span><strong class="lp_value">'+s+"<small>"+t+'</small></strong><i><a href="#" class="lp_js_toggle-item-details">'+e+"</a></i></li>"},r=function(){e.post(lpVars.ajaxUrl,{action:"laterpay_get_dashboard_data",_wpnonce:lpVars.nonces.dashboard,days:i.daysBack,count:i.itemsPerList,refresh:1},function(e){e.success&&l(e.data)},"json")},c=function(){o(),l()};c()}s()})}(jQuery);