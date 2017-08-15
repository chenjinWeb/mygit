/**
 * Created by admin on 2017/7/5.
 */


/**
 * Created by admin on 2017/7/3.
 */

var menuJs = {};

(function (){
    var menuFn=function (){
        var menu_model=new Vue({
            el: '#oBody',
            data:{
                categoryLists:[]
            },
            methods:{
                downLoad:function (){
                    alert(222)
                }
            },
            created:function () {
                this.$nextTick(function (){
                    $("#loadMore").show()
                    $.ajax({
                        type: "GET",
                        url: "http://iwifi.ycmedia.cn/API/GetAppHome",
                        dataType:"jsonp",
                        success: function(returnData){
                            $("#loadMore").hide()
                            for(var i=0;i<returnData.category_list.length;i++){
                                returnData.category_list[i].category=returnData["category_"+returnData.category_list[i].id];
                            }
                            menu_model.categoryLists=returnData.category_list;
                        }
                    })
                })
            }
        })

    }

    menuJs.menuFn=menuFn;

})()


