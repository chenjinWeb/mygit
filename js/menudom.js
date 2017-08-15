/**
 * Created by admin on 2017/7/3.
 */

var menuJs = {};

(function (){
    var menuDomFn=function (){

        var menu_model=new Vue({
            el: '#oBody',
            data:{
                appLists:[],
                id:"",
                category_id:""
            },
            methods:{
                getSearch:function (name){
                    var reg = new RegExp('(?:^|&)' + name + '=([^&]*)(?:&|$)', 'i');
                    return ((location.href.split('?')[1] || '').match(reg) || [])[1] || ''
                }
            },
            created:function () {
                this.$nextTick(function (){
                    menu_model.id=menu_model.getSearch("id");
                    menu_model.category_id=menu_model.getSearch("category_id");
                    $("#loadMore").show()
                    $.ajax({
                        type: "POST",
                        url: "http://iwifi.ycmedia.cn/API/getAppList?category_id="+menu_model.category_id+'&id='+menu_model.id,
                        dataType:"jsonp",
                        success: function(returnData){
                            $("#loadMore").hide()
                            menu_model.appLists=returnData;
                        }
                    })
                })
            }
        })

    }

    menuJs.menuDomFn=menuDomFn;

})()

