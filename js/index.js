/**
 * Created by admin on 2016/12/22.
 */


var indexJs = {};
(function (){
    var indexFn=function (){
        var isMobile=(function(){if(navigator.userAgent.match(/mobile/i)) return true})();
        var menulist;
        var randomNum=(1+parseInt(Math.random()*10))%2;
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var d=new Date();
        var strDate="2017627";

        if(isAndroid){
            $("#mobile_frame").attr("scrolling","yes")
        }else if(isiOS){
            //如果是IOS系统的
        }else{
            //如果是其他系统的
        }

        try{
            var userId=localStorage.getItem("userId");
            if(userId==null){
                userId=uuid();
                localStorage.setItem("userId",userId);
            }
        }catch (e){
            //alert("请在设置中设置允许保存cookie！")
        }

        //获取菜单
        try{
            menulist=JSON.parse(localStorage.getItem("menulist"));
        }catch (e){

        }

        if(menulist==null){
            menulist={
                toutiao:{"channelId":"toutiao","channelName":"头条"},
                shehui:{"channelId":"shehui","channelName":"社会"},
                guonei:{"channelId":"guonei","channelName":"国内"},
                guoji:{"channelId":"guoji","channelName":"国际"},
                yule:{"channelId":"yule","channelName":"娱乐"},
                tiyu:{"channelId":"tiyu","channelName":"体育"},
                v:strDate
            }
        }else{
            if(strDate!=menulist.v){
                menulist={
                    toutiao:{"channelId":"toutiao","channelName":"头条"},
                    shehui:{"channelId":"shehui","channelName":"社会"},
                    guonei:{"channelId":"guonei","channelName":"国内"},
                    guoji:{"channelId":"guoji","channelName":"国际"},
                    yule:{"channelId":"yule","channelName":"娱乐"},
                    tiyu:{"channelId":"tiyu","channelName":"体育"},
                    v:strDate
                }
                localStorage.setItem("menulist",JSON.stringify(menulist))
            }
        }

        var page=1;
        var firstShow=true;
        var index_model=new Vue({
            el: '#oBody',
            data:{
                ispass:true,
                isMobile:isMobile,
                randomNum:randomNum,
                banner_show:false,
                strDate:strDate,
                dataValue:'toutiao',
                searchText:'',
                randomArr:[
                    {
                        href:"https://union-click.jd.com/jdc?e=0&p=AyIHVCtaJQMiQwpDBUoyS0IQWhkeHAxbSkAOClBMW0srKEFhTBkxEi9wZ2AAXWIIDwJmYgljDRkOfARUG10JAxUbVR5KFQcZAlIQWxUyGwdQHF0SAxQCZRtaFAMRBFUZWxEyIgdUKxB7AyIOUhpdEQQUB1IrWxAKFAJWGF0TAhMGUCtcJdW%2Bm4Gd9My5ktHwtY2VgCI3ZSs%3D&t=W1dCFFlQCxxOGA5OREdcThk%3D",
                        src:"img/mobile_a.jpg"
                    },
                    {
                        href:"https://union-click.jd.com/jdc?e=0&p=AyIHVCtaJQMiQwpDBUoyS0IQWhkeHAxbSkAOClBMW0srKEFhTBkxEi9wZ2AAXWIIDwJmYgljDRkOfARUG10JAxUbVR5KFQcZAlIQWxUyGwdQHF0SAxQCZRtaFAMRBFUZWxEyIgdUKxB7AyIOUhpdEQQUB1IrWxAKFAJWGF0TAhMGUCtcJdW%2Bm4Gd9My5ktHwtY2VgCI3ZSs%3D&t=W1dCFFlQCxxOGA5OREdcThk%3D",
                        src:"img/mobile_b.jpg"
                    }
                ],
                menulists:[],
                toutiao:[],      //头条
                toutiaoScroll:0,      //头条
                shehui:[],       //社会
                shehuiScroll:0,       //社会
                guonei:[],       //国内
                guoneiScroll:0,       //国内
                guoji:[],        //国际
                guojiScroll:0,        //国际
                yule:[],         //娱乐
                yuleScroll:0,         //娱乐
                tiyu:[],         //体育
                tiyuScroll:0,         //体育
                junshi:[],       //军事
                junshiScroll:0,       //军事
                keji:[],         //科技
                kejiScroll:0,         //科技
                caijing:[],      //财经
                caijingScroll:0,      //财经
                shishang:[],     //时尚
                shishangScroll:0,     //时尚
                youxi:[],       //游戏
                youxiScroll:0,       //游戏
                qiche:[],         //汽车
                qicheScroll:0         //汽车
            },
            methods:{
                getLocalTime: function (nS) {
                    return  new Date(parseInt(nS) * 1000).Format("yyyy-MM-dd hh:mm:ss");
                },
                refreash:function (){
                    getInfo(userId,index_model.dataValue,page)
                },
                tabInfo:function (event) {
                    var $dom=event.target;

                    $("#top_menu_row .btn").removeClass("current");
                    $($dom).addClass("current");
                    index_model.dataValue=$($dom).attr("name");
                    this.$nextTick(function (){
                        upDate(index_model.dataValue)
                    })
                    scroll(index_model[index_model.dataValue+"Scroll"],50)
                    if(index_model[index_model.dataValue].length>0){
                        return
                    }
                    getInfo(userId,index_model.dataValue,page)
                },
                closeInfo:function () {
                    this.banner_show=false;
                }
            },
            created:function () {
                for(var key in menulist){
                    this.menulists.push(menulist[key])
                }
                this.$nextTick(function (){
                    $("#top_menu_row a").eq(0).addClass("current");
                    var Scroll = new iScroll('top_menu',{hScrollbar:false, vScrollbar:false});
                })

                if(!isMobile){
                    $(".force_mobile").css({
                       "height": "100px"
                    })

                    $(".force_mobile span").css({
                        "height": "30px",
                        "width": "30px"
                    })
                    this.randomArr=[
                        {
                            href:"https://union-click.jd.com/jdc?e=0&p=AyIPZRprFDJWWA1FBCVbV0IUWVALHFRBEwQAQB1AWQkFa1NKG1ICfFlsZ3BhNB4OFAYQflNFCUMOHmlWGlsTHhMASRtfBAISDFQfUBQLIg5VHlwTBRMBUCtbFAMTBFYbWRUGIjdVGmtebBM3XBxaEwEbAVMfaxUHGgFQE18dAxsAVhJrEjLFq8nP3brbqYeDvvXDgpA3ZStr&t=W1dCFFlQCxxUQRMEAEAdQFkJBQ%3D%3D",
                            src:"img/pc_a.jpg"
                        },
                        {
                            href:"https://union-click.jd.com/jdc?e=0&p=AyIPZRprFDJWWA1FBCVbV0IUWVALHFRBEwQAQB1AWQkFa1NKG1ICfFlsZ3BhNB4OFAYQflNFCUMOHmlWGlsTHhMASRtfBAISDFQfUBQLIg5VHlwTBRMBUCtbFAMTBFYbWRUGIjdVGmtebBM3XBxaEwEbAVMfaxUHGgFQE18dAxsAVhJrEjLFq8nP3brbqYeDvvXDgpA3ZStr&t=W1dCFFlQCxxUQRMEAEAdQFkJBQ%3D%3D",
                            src:"img/pc_b.jpg"
                        }
                    ]
                }

                $.getJSON('http://iwifi.ycmedia.cn/API/GetSearchSetting?v=1&callback=?', function (json) {
                    var searchUrl = isMobile ? json.info.mobileSearchUrl : json.info.pcSearchUrl;
                    $('#searchBtn').click(function () {
                        window.location.href = searchUrl + index_model.searchText;
                    });
                    $('#searchWord').keydown(function (e) {
                        var searchWord = $('#searchWord').val();
                        if (e.keyCode != 13 || searchWord == '') {
                            return;
                        }
                        window.location.href = searchUrl + searchWord;
                    });
                });
            },
        })

        getInfo(userId,index_model.dataValue,page);
        
        //下拉加载刷新
        function getInfo(uid,type,page){
            $.ajax({
                type:"get",
                url:"http://m.cnhksy.com/api/newsinformationgetlist?uid="+userId+"&type="+type+"&channel=3001&page="+page,
                dataType:'json',
                success:function (data){
                    var list = [];
                    for(var i=0;i<data.length;i++){
                        if(data[i].ImgUrl1 && data[i].ImgUrl2 && data[i].ImgUrl3){
                            var d = data[i];
                            list.push(d);
                        }
                    }

                    list.forEach(function (item,index) {
                        if(index==3){
                            item.isAd=true;
                            item.id=type;
                            item.adContent = '<div id="ad'+ type + page +'"></div>';
                        }
                        index_model[type].push(item);
                    });

                    index_model.$nextTick(function () {
                        $("#ad"+type).css({
                            height:"80px"
                        })
                        $("#ad"+type).parent().parent().css({
                            height:"120px"
                        })
                        setTimeout(function () {
                            ad("ad" + type +page);
                        },100)
                    });

                    function ad(id){
                        var $id= document.querySelector("#"+id);
                        if($id){
                            $id.innerHTML="";
                            var script1 = document.createElement("script");
                            script1.innerHTML = 'var adspaceID="tTLmnJMbh1qWQy_mm";';
                            $id.appendChild(script1);
                            var script2 = document.createElement("script");
                            script2.src = 'http://quanwangtoutiao.b0.upaiyun.com/mv2.js';
                            script2.setAttribute("sid","dpXEWEEAEEWAhAoRbn");
                            script2.setAttribute("data-app","");
                            $id.appendChild(script2);
                           /* var timer = null;
                            timer=setInterval(function (){
                                var domEle = $id.querySelectorAll("div")[0];
                                if(domEle){
                                    $("#"+id +">div").eq(0).css({
                                        height:"100px"
                                    })
                                    clearInterval(timer)
                                }
                            },100)*/
                        }
                    }
                },
                error:function (){

                }
            })
        }

        //下拉刷新
        function downFresh(uid,type,page){
            index_model[type]=[];
            getInfo(uid,type,page)
        }

        //随机生成用户ID
        function uuid() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");
            return uuid;
        }

        upDate("toutiao")

        //下拉刷新加载数据
        function upDate(dom) {
            $('#'+dom).dropload({
                scrollArea : window,
                domUp : {
                    domClass   : 'dropload-up',
                    domRefresh : '<div class="dropload-refresh"><p><img src="img/down.png"><span>下拉刷新</span></p></div>',
                    domUpdate  : '<div class="dropload-update"><p><img src="img/upload.png"><span>松开刷新</span></p></div>',
                    domLoad    : '<div class="dropload-load"><p><img src="img/refresh.png"><span>正在刷新</span></p></div>'
                },
                loadUpFn : function(me){
                    downFresh(userId,index_model.dataValue,page)
                    me.resetload();
                },
                threshold : 50
            });
        }

        //滚动到底部加载数据
        $(window).scroll(function(){
            index_model[index_model.dataValue+"Scroll"]=$(this).scrollTop();
            var scrollTop = $(this).scrollTop();               //滚动条距离顶部的高度
            var scrollHeight = $(document).height();           //当前页面的总高度
            var windowHeight = $(this).height();               //当前可视的页面高度
            if(scrollTop + windowHeight >= scrollHeight){        //距离顶部+当前高度 >=文档总高度 即代表滑动到底部
                page++;
                getInfo(userId,index_model.dataValue,page)
            }
        });

        //返回顶部
        $('.back-top').click(function(){
            //scroll('1500',500);
            scroll('0px',0);
        });

        function scroll(scrollTo, time) {
            var scrollFrom = parseInt(document.body.scrollTop),
                i = 0,
                runEvery = 5; // run every 5ms

            scrollTo = parseInt(scrollTo);

            time /= runEvery;

            var interval = setInterval(function () {
                i++;

                document.body.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;



                if (i >= time) {
                    clearInterval(interval);
                }
            }, runEvery);
        }

    }

    indexJs.indexFn=indexFn;

})()









