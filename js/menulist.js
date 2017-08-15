/**
 * Created by admin on 2016/12/26.
 */
$(function () {

    var listJson={
        toutiao:{"channelId":"toutiao","channelName":"头条"},
        shehui:{"channelId":"shehui","channelName":"社会"},
        guonei:{"channelId":"guonei","channelName":"国内"},
        guoji:{"channelId":"guoji","channelName":"国际"},
        yule:{"channelId":"yule","channelName":"娱乐"},
        tiyu:{"channelId":"tiyu","channelName":"体育"},
        junshi :{"channelId":"junshi","channelName":"军事"},
        keji:{"channelId":"keji","channelName":"科技"},
        caijing:{"channelId":"caijing","channelName":"财经"},
        shishang:{"channelId":"shishang","channelName":"时尚"},
        youxi:{"channelId":'youxi',"channelName":"游戏"},
        qiche:{"channelId":"qiche","channelName":"汽车"}
    }

    //上面的菜单
    var defaultList={};
    //下面的菜单
    var bottomList={};
    try{
        if(localStorage.getItem("menulist")==null){
            //如果没有菜单的话  默认给6个菜单
            var defaultJson={
                toutiao:{"channelId":"toutiao","channelName":"头条"},
                shehui:{"channelId":"shehui","channelName":"社会"},
                guonei:{"channelId":"guonei","channelName":"国内"},
                guoji:{"channelId":"guoji","channelName":"国际"},
                yule:{"channelId":"yule","channelName":"娱乐"},
                tiyu:{"channelId":"tiyu","channelName":"体育"}
            }
            localStorage.setItem("menulist",JSON.stringify(defaultJson));
        }
    }catch (e){

    }

    try{
        defaultList=JSON.parse(localStorage.getItem("menulist"));
    }catch (e){

    }
    //处理下面的菜单
    for(var key in listJson){
        if(defaultList[key]==undefined){
            bottomList[key]=listJson[key]
        }
    }

    getTopList();
    getBottomList();

    //得到上面的菜单
    function getTopList(){
        $("#topMenu").html("");
        for(var key in defaultList){
            if(key=="v"){
                continue;
            }
            var oLi=document.createElement("li");
            $(oLi).html(defaultList[key].channelName);
            $(oLi).attr("data-value",key);
            $("#topMenu").append(oLi);
            $(oLi).click(function (){
                if($(this).attr("data-value")!="toutiao"){
                    $(this).remove();
                    for(var key in defaultList){
                        if(key==$(this).attr("data-value")){
                            bottomList[key]=defaultList[key];
                            getBottomList()
                            delete defaultList[key]
                        }
                    }
                    try{
                        localStorage.setItem("menulist",JSON.stringify(defaultList))
                    }catch (e){

                    }
                }
            })
        }
    }

    //得到下面的菜单
    function getBottomList() {
        $("#bottomMenu").html("");
        for(var key in bottomList){
            if(key=="v"){
                continue;
            }
            var oLi=document.createElement("li");
            $(oLi).html(bottomList[key].channelName);
            $(oLi).attr("data-value",key);
            $("#bottomMenu").append(oLi);
            $(oLi).click(function () {
                if(getJsonLength(defaultList)>12){
                    alert("最多12个频道，请删除一些后再添加");
                    return
                }
                $(this).remove();
                for(var key in bottomList){
                    if(key==$(this).attr("data-value")){
                        defaultList[key]=bottomList[key];
                        getTopList();
                        delete bottomList[key]
                    }
                }
                try{
                    localStorage.setItem("menulist",JSON.stringify(defaultList))
                }catch (e){

                }
            })
        }
    }

    //获取JSON的长度
    function getJsonLength(jsonData){

        var jsonLength = 0;

        for(var item in jsonData){

            jsonLength++;

        }

        return jsonLength;

    }

})

